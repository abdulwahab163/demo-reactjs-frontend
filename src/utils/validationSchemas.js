import * as yup from "yup";

export const signUpValidationSchema = yup.object().shape({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  name: yup.string("Enter name").min(3).required("Name is required"),
});

export const categoryValidationSchema = yup.object().shape({
  name: yup.string("Enter category").required("category is required"),
});

export const carValidationSchema = yup.object().shape({
  category_id: yup.string("choose category").required("category is required"),
  name: yup.string("Enter name").min(3).required("name is required"),
  color: yup.string("Enter color").min(3).required("color is required"),
  model: yup.string("Enter model").min(3).required("model is required"),
  make: yup.string("Enter make").min(4).required("make is required"),
  registration: yup.string("Enter make").min(3).required("registration is required"),
});

export const signInValidationSchema = yup.object().shape({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(6)
    .required("Password is required"),
});
