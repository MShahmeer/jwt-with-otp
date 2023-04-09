// Here we will create the controllers for all of the routes we specified in the route.js, like what will be displayed on the router /api/register etc

import UserModel from "../model/User.model.js";
import bcrypt from "bcrypt";
import ENV from "../config.js";
import jwt from "jsonwebtoken";

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
  res.json("getUser Route");
}

/** PUT: http://localhost:8080/api/updateUser*/
export async function updateUser(req, res) {
  res.json("updateUser Route");
}

/** GET: http://localhost:8080/api/generateOTP*/
export async function generateOTP(req, res) {
  res.json("generateOTP Route");
}

/** GET: http://localhost:8080/api/verifyOTP*/
export async function verifyOTP(req, res) {
  res.json("verifyOTP Route");
}

/** Successfully redirect the user when the OTP is valid */
/** GET: http://localhost:8080/api/createResetSession*/
export async function createResetSession(req, res) {
  res.json("createResetSession Route");
}

/** Update the password when we have the valid session */
/** GET: http://localhost:8080/api/resetPassword*/
export async function resetPassword(req, res) {
  res.json("resetPassword Route");
}
