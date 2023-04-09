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
  name: "",
};

const onSubmit = async (values) => {
  console.log(values);
};

const validationSchema = Yup.object({
  name: Yup.string().required("Username is required"),
});

const Username = () => {
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
              <Typography variant="h5"> Hello {":)"}</Typography>

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
                <Field name="name">
                  {({ field, form, meta }) => {
                    return (
                      <TextField
                        sx={{
                          width: "100%",
                        }}
                        label="User Name"
                        fullWidth
                        variant="standard"
                        name="name"
                        id="name"
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
                  Let's Go
                </Button>
              </Form>
              <Typography>
                Not a member?{" "}
                <Button component={Link} to="/register">
                  {" "}
                  Register Now
                </Button>
              </Typography>
            </Box>
          );
        }}
      </Formik>
    </Box>
  );
};

export default Username;
