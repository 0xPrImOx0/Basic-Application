import * as yup from "yup";

export const validateCredentials = yup.object({
  school: yup.string().required("This field is required."),
  location: yup.string().required("This field is required."),
  //   dob: yup.required("This field is required."),
  email: yup
    .string()
    .required("This field is required.")
    .email("Please enter a valid email address"),
  contact: yup
    .string()
    .required("This field is required.")
    .matches(
      /^09\d{9}$/,
      "Contact number must start with 09 and be 11 digits long."
    ),
});

export const validatePassword = yup.object({
  currentPassword: yup
    .string()
    .required("This field is required.")
    .min(8, "Password must contain at least 8 characters.")
    .max(128, "Password must contain at most 128 characters."),

  newPassword: yup
    .string()
    .required("This field is required.")
    .min(8, "Password must contain at least 8 characters.")
    .max(128, "Password must contain at most 128 characters."),

  confirmNewPassword: yup
    .string()
    .required("This field is required.")
    .oneOf(
      [yup.ref("newPassword")],
      "Make sure it matched New Password before continuing."
    ),
});
