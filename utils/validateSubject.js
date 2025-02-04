import * as yup from "yup";

const validateSubject = yup.object({
  courseCode: yup.string().required("This field is required."),
  courseName: yup
    .string()
    .required("This field is required.")
    .min(4, "Name must contain at least 4 characters."),
  courseType: yup.string().required("This field is required."),
  section: yup.string().required("This field is required."),
  f2fScheduleDay: yup.string().required("This field is required."),
  f2fScheduleTime: yup.string().required("This field is required."), // Changed to string
  room: yup.string().required("This field is required."),
  onlineScheduleDay: yup.string().required("This field is required."),
  onlineScheduleTime: yup.string().required("This field is required."), // Changed to string
  instructor: yup
    .string()
    .required("This field is required.")
    .min(4, "Instructor Name must contain at least 4 characters."),
});

export default validateSubject;
