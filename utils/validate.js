import * as yup from "yup";

export const signUpSchema = yup.object({
  fullName: yup
    .string()
    .required("This field is required.")
    .min(4, "Name must contain at least 4 characters.")
    .max(50, "Name must contain at most 50 characters."),

  email: yup
    .string()
    .required("This field is required.")
    .email("Please enter a valid email address"),

  password: yup
    .string()
    .required("This field is required.")
    .min(8, "Password must contain at least 8 characters.")
    .max(128, "Password must contain at most 128 characters."),

  confirmPassword: yup
    .string()
    .required("This field is required.")
    .oneOf(
      [yup.ref("password")],
      "Make sure both passwords match before continuing."
    ),
});

export const signInSchema = yup.object({
  email: yup
    .string()
    .required("This field is required.")
    .email("Please enter a valid email address"),

  password: yup
    .string()
    .required("This field is required.")
    .min(8, "Password must contain at least 8 characters.")
    .max(128, "Password must contain at most 128 characters."),
});
