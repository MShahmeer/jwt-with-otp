import { Router } from "express";

/** import all controllers */
import * as controller from "../controller/appController.js";

const router = Router();

/** Post Methods */
router.route("/register").post(controller.register); //register the user
router.route("/registerMail").post(); // send the email
router.route("/authenticate").post((req, res) => res.end()); // authenticate the user
router.route("/login").post(controller.verifyUser, controller.login); // login the app

/** Get Methods */
router.route("/user/:userName").get(controller.getUser); //user with username
router.route("/generateOTP").get(controller.generateOTP); //generate random OTP
router.route("/verifyOTP").get(controller.verifyOTP); //verify generated OTP
router.route("/createResetSession").get(controller.createResetSession); //reset all the variables

/** Put Methods */
router.route("/updateUser").put(controller.updateUser); //is to update the user
router.route("/resetPassword").put(controller.resetPassword); //use to reset password

export default router;
