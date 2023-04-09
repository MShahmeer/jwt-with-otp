// Here we will create the controllers for all of the routes we specified in the route.js, like what will be displayed on the router /api/register etc

/** POST: http://localhost:8080/api/register */
export async function register(req, res) {
  res.json("Register Route");
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
