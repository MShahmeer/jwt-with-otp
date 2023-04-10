// Here we will create the controllers for all of the routes we specified in the route.js, like what will be displayed on the router /api/register etc

import UserModel from "../model/User.model.js";
import bcrypt from "bcrypt";
import ENV from "../config.js";
import jwt from "jsonwebtoken";
import otpGenerator from "otp-generator";

/** Middleware for the verify user */
export async function verifyUser(req, res, next) {
  try {
    const { userName } = req.method == "GET" ? req.query : req.body;

    //check the user existance
    let exist = await UserModel.findOne({ userName });
    if (!exist) {
      return res.status(404).send({ error: "Can't find user" });
    }
    next();
  } catch (error) {
    return res.status(404).send({ error: "Authentication Error" });
  }
}

/** POST: http://localhost:8080/api/register */
export async function register(req, res) {
  try {
    const { userName, password, email, mobileNumbers, profile } = req.body;

    /** Check already existing user */
    const existUserName = await UserModel.findOne({ userName });
    if (existUserName) {
      return res.status(400).json({ error: "username already taken" });
    }

    /** Check already existing email */
    const existEmail = await UserModel.findOne({ email });
    if (existEmail) {
      return res.status(400).json({ error: "user with email already exists" });
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new UserModel({
        userName,
        password: hashedPassword,
        profile: profile || "",
        email,
        mobileNumbers,
      });
      await user.save();
      return res.status(201).json({ msg: "User registered successfully" });
    }
    return res.status(400).json({ error: "Invalid request" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

/** POST: http://localhost:8080/api/login */
export async function login(req, res) {
  const { userName, password } = req.body;
  try {
    const user = await UserModel.findOne({ userName });
    // Check if the user with the given userName exists
    if (!user) {
      return res.status(404).send({ error: "Username not found" });
    }

    // Compare the given password with the user's password
    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      // If the passwords don't match, send an error response
      return res.status(400).send({ error: "Password does not match" });
    }

    // Check if the user has a password
    if (!user.password) {
      return res.status(400).send({ error: "User does not have a password" });
    }

    const token = await jwt.sign(
      {
        userId: user._id,
        userName: user.userName,
      },
      ENV.JWT_SECRET,
      { expiresIn: "24hr" }
    );

    // If all checks pass, return a success response
    return res.status(200).send({
      message: "Login successful",
      userName: user.userName,
      token,
    });
  } catch (error) {
    // Handle any other errors that may occur
    return res.status(500).send({ error });
  }
}

/** GET: http://localhost:8080/api/user/shahmeer*/
export async function getUser(req, res) {
  const { userName } = req.params;

  try {
    if (!userName) {
      return res.status(501).send({ error: "Invalid Username" });
    }

    const user = await UserModel.findOne({ userName });

    if (!user) {
      return res.status(501).send({ error: "Couldn't find the user" });
    }

    // remove password from the data and mongoose give unnecessary data so convert it to JSON
    const { password, ...rest } = Object.assign({}, user.toJSON());

    return res.status(201).send(rest);
  } catch (error) {
    return res.status(404).send({ error: "Can't find user data" });
  }
}

/** PUT: http://localhost:8080/api/updateUser*/

export async function updateUser(req, res) {
  try {
    const id = req.query.id;
    const { userId } = req.user; // we are getting this userID after decoding the token
    if (id) {
      const body = req.body;
      //update the data
      await UserModel.findOneAndUpdate({ _id: userId }, body);
      return res.status(201).send({ msg: "Record Updated" });
    } else {
      res.status(401).send({ error: "User Not Found" });
    }
  } catch (error) {
    return res.status(401).send({ error });
  }
}

/** GET: http://localhost:8080/api/generateOTP*/
export async function generateOTP(req, res) {
  req.app.locals.OTP = await otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
  res.status(201).send({ code: req.app.locals.OTP });
}

/** GET: http://localhost:8080/api/verifyOTP*/
export async function verifyOTP(req, res) {
  const { code } = await req.query;
  console.log(code);
  if (parseInt(req.app.locals.OTP) === parseInt(code)) {
    req.app.locals.OTP = null; //reset the OTP value
    req.app.locals.resetSession = true; // start session for reset password
    return res.status(201).send({ msg: "Verified Successfully" });
  }

  return res.status(400).send({ error: "Invalid OTP" });
}

/** Successfully redirect the user when the OTP is valid */
/** GET: http://localhost:8080/api/createResetSession*/
export async function createResetSession(req, res) {
  if (req.app.locals.resetSession) {
    req.app.locals.resetSession = false; //allow access to this route only once
    return res.status(201).send({ msg: "Access Granted" });
  }
  return res.status(440).send({ error: "Session Expired" });
}

/** Update the password when we have the valid session */
/** GET: http://localhost:8080/api/resetPassword*/
export async function resetPassword(req, res) {
  try {
    if (!req.app.locals.resetSession)
      return res.status(440).send({
        error: "Session Expired",
      }); /**so that a random person can't update the password */
    const { userName, password } = req.body;
    const user = await UserModel.findOne({ userName });
    if (!user) {
      return res.status(400).send({ error: "Username not found" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await UserModel.updateOne(
      { userName: user.userName },
      { password: hashedPassword }
    );
    req.app.locals.resetSession = false;
    return res.status(201).send({ msg: "Record updated" });
  } catch (error) {
    return res.status(500).send({ error: "Failed to reset password" });
  }
}
