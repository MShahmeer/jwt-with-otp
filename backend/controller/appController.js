// Here we will create the controllers for all of the routes we specified in the route.js, like what will be displayed on the router /api/register etc

import UserModel from "../model/User.model.js";
import bcrypt from "bcrypt";

/** POST: http://localhost:8080/api/register */
// export async function register(req, res) {
//   try {
//     const { userName, password, email, mobileNumbers, profile } = req.body;

//     /** Check already existing user */
//     const existUserName = new Promise((resolve, reject) => {
//        UserModel.findOne({ userName }, function (error, user) {
//         if (error) reject(new Error(error));
//         if (user) reject({ error: "username already taken" });

//         resolve();
//       });
//     });
//     /** Check already existing email */
//     const existEmail = new Promise((resolve, reject) => {
//        UserModel.findOne({ email }, function (error, email) {
//         if (error) reject(new Error(err));
//         if (email) reject({ error: "user with email already exists" });

//         resolve();
//       });
//     });

//     Promise.all([existUserName, existEmail])
//       .then(() => {
//         if (password) {
//           console.log("email: ", email);

//           bcrypt
//             .hash(password, 10)
//             .then((hashedPassword) => {
//               const user = new UserModel({
//                 userName,
//                 password: hashedPassword,
//                 profile: profile || "",
//                 email,
//                 mobileNumbers,
//               });

//               /** Return and save the result as response */
//               user.save().then((result) =>
//                 res
//                   .status(201)
//                   .send({ msg: "User Registered successfully" })
//                   .catch((error) => {
//                     res.status(500).send({ error: "unknown" });
//                   })
//               );
//             })
//             .catch((err) => {
//               return res.status(500).send({
//                 error: "Enabled to hashed password",
//               });
//             });
//         }
//       })
//       .catch((error) => {
//         return res.status(500).send({ error: "Second Last" });
//       });
//   } catch (error) {
//     return res.status(500).send({ error: "Last one" });
//   }
// }

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
  res.json("Login Route");
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
