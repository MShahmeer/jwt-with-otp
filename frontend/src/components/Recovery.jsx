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
  OTP: "",
};

const onSubmit = async (values) => {
  console.log(values);
};

const validationSchema = Yup.object({
  OTP: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:"
    )
    .required("OTP is required"),
});

const Recovery = () => {
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
              <Typography variant="h5"> Recovery</Typography>
              <Box sx={{}}>
                <Typography variant="p">
                  {" "}
                  Enter 6 digit OTP sent to your email
                </Typography>
              </Box>

              <Form>
                <Field name="password">
                  {({ field, form, meta }) => {
                    return (
                      <TextField
                        sx={{
                          width: "100%",
                        }}
                        type="text"
                        label="OTP"
                        fullWidth
                        variant="standard"
                        name="OTP"
                        id="OTP"
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
                  Recover
                </Button>
              </Form>
              <Typography>
                Can't get OTP? <Button> Resend</Button>
              </Typography>
            </Box>
          );
        }}
      </Formik>
    </Box>
  );
};

export default Recovery;
