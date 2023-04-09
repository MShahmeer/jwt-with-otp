import {
  Avatar,
  Box,
  Button,
  Fab,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

import Profile from "../assets/profile.png";
import converToBase64 from "../HelperFunctions/convert";

const ProfileData = () => {
  const [image, setImage] = useState("");

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobileNumbers: [""],
  };

  const onSubmit = async (values) => {
    values = await Object.assign(values, {
      profile: image || "",
    }); /** Add a new value in the values object so that we can access that, that value has the image uploaded */
    console.log(values);
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().nullable().email().required("Email is required"),
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:"
      )
      .required("Password is required"),

    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password")],
      "Passwords must match"
    ),

    mobileNumbers: Yup.array()
      .of(
        Yup.string()
          .matches(/^(\+?\d{1,3}[- ]?)?\d{10}$/, "Mobile number is not valid")
          .required("Mobile number is required")
      )
      .min(1, "At least one mobile number is required"),
  });

  /** Formik doesn't support the file upload so we need the function */
  const upload = async (e) => {
    const base64 = await converToBase64(e.target.files[0]);
    setImage(base64);
  };
  return (
    <Box
      sx={{
        pt: 8,
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
                width: 300,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 3,
              }}
            >
              <Typography variant="h5"> You can update your data</Typography>
              <label htmlFor="avatar-input">
                <IconButton color="primary" component="span">
                  <Avatar
                    sx={{ width: 80, height: 80 }}
                    alt="Avatar"
                    src={image || Profile}
                  />
                </IconButton>
              </label>
              <input
                accept="image/*"
                id="avatar-input"
                type="file"
                style={{ display: "none" }}
                onChange={upload}
              />

              <Form>
                <Field name="name">
                  {(props) => {
                    return (
                      <TextField
                        type="text"
                        label="Name"
                        fullWidth
                        variant="standard"
                        name="name"
                        id="name"
                        error={props.meta.error ? true : false}
                        helperText={props.meta.error}
                        {...props.field}
                      />
                    );
                  }}
                </Field>
                <Field name="email">
                  {({ field, form, meta }) => {
                    return (
                      <TextField
                        type="text"
                        label="Email"
                        fullWidth
                        variant="standard"
                        name="email"
                        id="email"
                        error={meta.error ? true : false}
                        helperText={meta.error}
                        {...field}
                      />
                    );
                  }}
                </Field>
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
                <Field name="confirmPassword">
                  {({ field, form, meta }) => {
                    return (
                      <TextField
                        sx={{
                          width: "100%",
                        }}
                        type="password"
                        label="Confirm Password"
                        fullWidth
                        variant="standard"
                        name="confirmPassword"
                        id="confirmPassword"
                        error={meta.error ? true : false}
                        helperText={meta.error}
                        {...field}
                      />
                    );
                  }}
                </Field>
                <FieldArray name="mobileNumbers">
                  {(fieldArrayProps) => {
                    const { push, remove, form } = fieldArrayProps;
                    const { values } = form;
                    const { mobileNumbers } = values;

                    return (
                      <Box>
                        {mobileNumbers.map((mobileNumber, index) => (
                          <Box key={index}>
                            <Field name={`mobileNumbers[${index}]`}>
                              {(props) => {
                                return (
                                  <TextField
                                    type="text"
                                    label="Enter Mobile Number"
                                    variant="standard"
                                    name="mobileNumbers"
                                    id="mobileNumbers"
                                    error={props.meta.error ? true : false}
                                    helperText={props.meta.error}
                                    {...props.field}
                                  />
                                );
                              }}
                            </Field>
                            {index > 0 && (
                              <IconButton
                                onClick={() => remove(index)}
                                color="primary"
                              >
                                <RemoveCircleOutlineIcon fontSize="large" />
                              </IconButton>
                            )}

                            <IconButton
                              onClick={() => push("")}
                              color="primary"
                            >
                              <AddCircleOutlineIcon fontSize="large" />
                            </IconButton>
                          </Box>
                        ))}
                      </Box>
                    );
                  }}
                </FieldArray>

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
                Come Back later?{" "}
                <Button component={Link} to="/">
                  {" "}
                  Login Out
                </Button>
              </Typography>
            </Box>
          );
        }}
      </Formik>
    </Box>
  );
};

export default ProfileData;
