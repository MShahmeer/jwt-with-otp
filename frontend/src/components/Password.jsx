import {
  Avatar,
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";

import Profile from "../assets/profile.png";
import { Link } from "react-router-dom";

const initialValues = {
  password: "",
};

const onSubmit = async (values) => {
  console.log(values);
};

const validationSchema = Yup.object({
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:"
    )
    .required("Password is required"),
});

const Password = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: 620,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {(formik) => {
          return (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 3,
              }}
            >
              <Typography variant="h5">
                {" "}
                Hello {":)"} Enter Your Password
              </Typography>
              <label htmlFor="avatar-input">
                <IconButton color="primary" component="span">
                  <Avatar
                    sx={{ width: 80, height: 80 }}
                    alt="Avatar"
                    src={Profile}
                  />
                </IconButton>
              </label>
              <input
                accept="image/*"
                id="avatar-input"
                type="file"
                style={{ display: "none" }}
              />

              <Form>
                <Field name="password">
                  {({ field, form, meta }) => {
                    return (
                      <TextField
                        sx={{
                          width: "100%",
                        }}
                        type="password"
                        label="Password"
                        fullWidth
                        variant="standard"
                        name="password"
                        id="password"
                        error={meta.error ? true : false}
                        helperText={meta.error}
                        {...field}
                      />
                    );
                  }}
                </Field>

                <Button
                  sx={{
                    mt: 2,
                  }}
                  fullWidth
                  variant="outlined"
                  type="submit"
                >
                  Sign in
                </Button>
              </Form>
              <Typography>
                Forgot Password?{" "}
                <Button component={Link} to="/recovery">
                  {" "}
                  Recover Now
                </Button>
              </Typography>
            </Box>
          );
        }}
      </Formik>
    </Box>
  );
};

export default Password;
