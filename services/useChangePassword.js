import { useState } from "react";
import supabase from "../lib/supabase";

const useChangePassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // Changed from Error object to string

  const changePasswordData = async ({
    session,
    currentPassword,
    newPassword,
  }) => {
    try {
      setIsLoading(true);
      setErrorMessage(""); // Reset error message

      // console.log("reached hereeeee");

      // console.log("Received session:", JSON.stringify(session, null, 2));
      // console.log(currentPassword);
      // console.log(newPassword);

      // Defensive checks
      if (!session) throw new Error("No session provided");
      if (!session.user) throw new Error("No user in session");
      if (!session.user.email) throw new Error("No email in user object");

      // Verify current password by attempting to sign in
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: session.user.email,
        password: currentPassword,
      });

      if (signInError) {
        const message = signInError.message || "Current password is incorrect";
        setErrorMessage(message);
        return {
          success: false,
          error: message,
          errorComponent: "currentPassword",
        };
      }

      // Update password
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (updateError) {
        const message = updateError.message || "Failed to update password";
        setErrorMessage(message);
        return { success: false, error: message };
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
    changePasswordData,
    isLoading,
    errorMessage, // Return error message instead of Error object
  };
};

export default useChangePassword;
