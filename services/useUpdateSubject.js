import { useState } from "react";
import supabase from "../lib/supabase";

const useUpdateSubject = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // Changed from Error object to string

  const changeSubject = async ({ session, formData }) => {
    try {
      setIsLoading(true);
      setErrorMessage(""); // Reset error message

      // Defensive checks
      if (!session) throw new Error("No session provided");
      if (!formData) throw new Error("No form data provided");

      // Check if the new email already exists
      const { data: existingData, error: fetchError } = await supabase
        .from("courses")
        .select("*")
        .eq("email", session.user.email)
        .single(); // Get a single record

      console.log("DATA EXISTED:", existingData);

      //   if (fetchError) {
      //     setErrorMessage(fetchError.message);
      //     return { error: fetchError.message };
      //   }

      if (fetchError && fetchError.code !== "PGRST116") {
        // Ignore not found error
        console.error("Fetch error:", fetchError);
        throw new Error(fetchError.message);
      }

      // Prepare new course data
      const courseData = {
        ...formData,
        createdAt: new Date().toISOString(),
      };

      // Prepare course_enrolled array
      const newCourseEnrolled = existingData?.course_enrolled
        ? [...existingData.course_enrolled, courseData]
        : [courseData];

      // Perform the upsert operation
      const { error: upsertError } = await supabase.from("courses").upsert(
        {
          email: session.user.email,
          course_enrolled: newCourseEnrolled,
        },
        {
          onConflict: "email",
          returning: "minimal", // Don't need to return the data
        }
      );
      if (upsertError) {
        console.error("Upsert error:", upsertError);
        throw new Error(upsertError.message);
      }

      return { success: true };
    } catch (err) {
      setErrorMessage(err.message); // Store error message instead of Error object
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    changeSubject,
    isLoading,
    errorMessage, // Return error message instead of Error object
  };
};

export default useUpdateSubject;
