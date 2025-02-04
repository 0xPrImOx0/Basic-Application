import * as yup from "yup";

const validateProfile = yup.object({
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

export default validateProfile;
