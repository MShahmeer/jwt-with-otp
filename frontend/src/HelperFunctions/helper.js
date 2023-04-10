import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;
/** Make the Api request */

/**Authenticate Function */
export async function authenticate(userName) {
  try {
    return await axios.post("/api/authenticate", { userName });
  } catch (error) {
    return { error: "Username doesn't exist" };
  }
}

/** Get user details */

export async function getUser({ userName }) {
  try {
    const { data } = await axios.get(`/api/user/${userName}`);
    return data;
  } catch (error) {
    return { error: "Password doesn't match" };
  }
}

/** Register User Function */

export async function registerUser(credentials) {
  try {
    const {
      data: { msg },
      status,
    } = await axios.post(`/api/register`, credentials);

    let { userName, email } = credentials;
    if (status === 201) {
      await axios.post(`/api/registerMail`, { userName, email, text: msg });
    }

    return Promise.resolve(msg);
  } catch (error) {
    return Promise.reject({ error });
  }
}

/** Login Function */
export async function verifyPassword({ userName, password }) {
  try {
    if (userName) {
      const { data } = await axios.post(`/api/login`, { userName, password });
      return Promise.resolve({ data });
    }
  } catch (error) {
    return { error: "Password doesn't match" };
  }
}

/** Update User Profile Function */
/** This will get the Id as well as the token to update the user */
export async function updateUser(response) {
  try {
    const token = await localStorage.getItem();
    const data = await axios.put("/api/updateUser", response, {
      headers: { Authorization: `Bearer ${token}` },
    });

    Promise.resolve({ data });
  } catch (error) {
    return Promise.reject({ error: "Couldn't Update Profile" });
  }
}

/** Generate OTP */
export async function generateOTP(userName) {
  try {
    const {
      data: { code },
      status,
    } = await axios.get("/api/generateOTP", { params: { userName } });
    //send mail with the OTP
    if (status === 201) {
      //first get the user and then send the email
      let {
        data: { email },
      } = await getUser({ userName });

      //Boiler plate for the email
      let text = `Your Password Recovery OTP is ${code}, verify and recover password`;
      await axios.post("/api/registerMail", {
        userName,
        email,
        text,
        subject: "Password Recovery OTP",
      });
    }
    return Promise.resolve(code);
  } catch (error) {
    return Promise.reject({ error });
  }
}

/** Verify OTP */

export async function verifyOTP({ userName, code }) {
  try {
    const { data, status } = await axios.get("/api/verifyOTP", {
      params: { userName, code },
    });
    return { data, status };
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function resetPassword({ userName, password }) {
  try {
    const { data, status } = await axios.put("/api/resetPassword", {
      userName,
      password,
    });
    return Promise.resolve({ data, status });
  } catch (error) {
    Promise.reject({ error });
  }
}
