import jwt from "jsonwebtoken";
import ENV from "../config.js";

/** Auth Middleware */

export default async function Auth(req, res, next) {
  try {
    //access the autherized header to validate request
    const token = await req.headers.authorization.split(" ")[1]; //because we get space in between bearer and token, so at the index 1 there will be a token

    // retrive the user details of the logged in user
    const decodedToken = await jwt.verify(token, ENV.JWT_SECRET);
    req.user = decodedToken;

    next();
  } catch (error) {
    res.status(401).json({ error: "Authentication Failed" });
  }
}
