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
  f2fScheduleTimeStart: yup.string().required("This field is required."), // Changed to string
  f2fScheduleTimeEnd: yup.string().required("This field is required."), // Changed to string
  roomDesignated: yup.string().required("This field is required."),
  onlineScheduleDay: yup.string().required("This field is required."),
  onlineScheduleTimeStart: yup.string().required("This field is required."), // Changed to string
  onlineScheduleTimeEnd: yup.string().required("This field is required."), // Changed to string
  instructor: yup
    .string()
    .required("This field is required.")
    .min(4, "Instructor Name must contain at least 4 characters."),
});

export default validateSubject;
