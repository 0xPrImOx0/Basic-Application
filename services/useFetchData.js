import { useState } from "react";
import supabase from "../lib/supabase";

const useFetchData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // Changed from Error object to string

  const useFetchProfileInfo = async ({ session }) => {
    try {
      setIsLoading(true);
      setErrorMessage(""); // Reset error message

      // Defensive checks
      if (!session) throw new Error("No session provided");

      // Retrieving data from supabase
      const { data: existingUser, error: fetchError } = await supabase
        .from("users")
        .select("*")
        .eq("user_uuid", session.user.id)
        .single();

      console.log("DATA RETRIEVED:", existingUser);

      if (fetchError) {
        return { error: fetchError };
      }

      return { data: existingUser };
    } catch (err) {
      setErrorMessage(err.message); // Store error message instead of Error object
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    useFetchProfileInfo,
    isLoading,
    errorMessage, // Return error message instead of Error object
  };
};

export default useFetchData;
