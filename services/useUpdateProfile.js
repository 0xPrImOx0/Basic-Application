import { useState } from "react";
import supabase from "../lib/supabase";

const useUpdateProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // Changed from Error object to string

  const changeProfileInfo = async ({ session, formData, dob }) => {
    try {
      setIsLoading(true);
      setErrorMessage(""); // Reset error message

      // Defensive checks
      if (!session) throw new Error("No session provided");
      if (!formData) throw new Error("No form data provided");
      if (!dob) throw new Error("No date of birth provided");

      // Check if the new email already exists
      const { data: existingUser, error: fetchError } = await supabase
        .from("users")
        .select("user_uuid, email")
        .eq("email", formData.email)
        .single(); // Get a single record

      console.log("DATA EXISTED:", existingUser);

      if (fetchError) {
        return { error: fetchError };
      } else if (existingUser) {
        if (existingUser.user_uuid === session.user.id) {
          const { error: updateError } = await supabase
            .from("users")
            .update({
              university: formData.school,
              city: formData.location,
              dob: dob,
              email: formData.email,
              phone_number: formData.contact,
            })
            .eq("user_uuid", session.user.id); // Specify the condition for the update

          if (updateError) {
            return { error: updateError.message };
          }
        } else {
          return {
            error: "New email already exists for another user.",
            errorComponent: "email",
          };
          // Handle the situation (e.g., show an error message to the user)
        }
      } else {
        // Proceed with the update if the new email is unique
        const { error: updateError } = await supabase
          .from("users")
          .update({
            university: formData.school,
            location: formData.location,
            dob: dob,
            email: formData.email,
            phone_number: formData.contact,
          })
          .eq("user_uuid", session.user.id); // Specify the condition for the update

        if (updateError) {
          return { error: updateError.message };
        }
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
    changeProfileInfo,
    isLoading,
    errorMessage, // Return error message instead of Error object
  };
};

export default useUpdateProfile;
