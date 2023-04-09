import {
  Avatar,
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

/** Test */

import { Link } from "react-router-dom";

const initialValues = {
  password: "",
  confirmPassword: "",
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
    .required("You haven't entered new password"),

  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password")],
    "Passwords must match"
  ),
});

const Reset = () => {
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
              <Typography variant="h5"> Enter Your New Password</Typography>

              <Form>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Field name="password">
                    {({ field, form, meta }) => {
                      return (
                        <TextField
                          type="password"
                          label="Password"
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

                  <Field name="confirmPassword">
                    {({ field, form, meta }) => {
                      return (
                        <TextField
                          type="password"
                          label="Confirm Password"
                          variant="standard"
                          name="confirmPassword"
                          id="cnfirmPassword"
                          error={meta.error ? true : false}
                          helperText={meta.error}
                          {...field}
                        />
                      );
                    }}
                  </Field>
                </Box>

                <Button
                  sx={{
                    mt: 2,
                  }}
                  fullWidth
                  variant="outlined"
                  type="submit"
                >
                  Reset
                </Button>
              </Form>
            </Box>
          );
        }}
      </Formik>
    </Box>
  );
};

export default Reset;
