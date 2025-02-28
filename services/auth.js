import Toast from "react-native-toast-message";
import supabase from "../lib/supabase";

// Signup function
export async function createAccount(email, password, fullName) {
  // Sign up the user with email and password
  const { data: user, error: signupError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        display_name: fullName, // Store full name in the display_name column
        email_verified: true,
      },
    },
  });

  if (signupError) {
    return { error: signupError };
  }

  console.log("DEBUGGING USER:", user);

  await new Promise((resolve) => setTimeout(resolve, 1000)); // Delay for 1 second

  // Insert the user details into the public.users table
  const { error: insertError } = await supabase.from("users").insert([
    {
      email,
      full_name: fullName,
      user_uuid: user.user.id, // Link to the auth.users table
    },
  ]);

  if (insertError) {
    return { error: "INSERT ERROR", insertError };
  }

  console.log("INSERT ERROR REACHED HERE");

  const { user: logInUser, error: logInError } = await logIn(email, password);

  if (logInError) {
    return { user: null, error: logInError };
  }

  console.log("LOGINERROR REACHED HERE");

  const folderPath = `users/${logInUser.user.id}/dummy.txt`; // Ensure it includes a filename
  const file = new Blob(["dummy content"], { type: "text/plain" });

  console.log("FILE REACHED HERE");

  try {
    const { data, error } = await supabase.storage.listBuckets();

    console.log("FETCHING BUCKKKETTT:", data, error);

    console.log("Starting file upload...");

    const { data: bucketData, error: bucketError } = await supabase.storage
      .from("userUploads")
      .upload(folderPath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    console.log("UPLOAD RESPONSE:", bucketData, bucketError);

    if (bucketError) {
      console.error("Upload Error:", bucketError);
      return { user: logInUser, error: bucketError };
    }
  } catch (e) {
    console.error("Unexpected Upload Error:", e);
    return { user: logInUser, error: e.message };
  }

  return { user: logInUser, bucket: bucketData, error: null };
}

// // Example usage
// const email = 'user@example.com';
// const password = 'your-password';
// const fullName = 'User Full Name';

// signup(email, password, fullName)
//   .then(response => {
//     if (response.error) {
//       console.error('Error during signup:', response.error);
//     } else {
//       console.log('Signup successful:', response.user);
//     }
//   });

// Login function
export async function logIn(email, password) {
  // Log in the user with email and password
  const { data: user, error: loginError } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

  if (loginError) {
    return { error: loginError };
  }

  // Optionally, fetch user profile from the users table
  const { data: userProfile, error: profileError } = await supabase
    .from("users")
    .select("*")
    .eq("user_uuid", user.user.id)
    .single(); // Fetch the user's profile

  if (profileError) {
    console.error("Profile fetch error:", profileError);
    return { error: profileError };
  }

  return { user, userProfile };
}

// // Example usage
// const email = 'user@example.com';
// const password = 'your-password';

// login(email, password)
//   .then(response => {
//     if (response.error) {
//       console.error('Error during login:', response.error);
//     } else {
//       console.log('Login successful:', response.user);
//       console.log('User profile:', response.userProfile);
//     }
//   });

// Sign-out function
export async function logOut() {
  // Step 1: Sign out the user
  const { error: signOutError } = await supabase.auth.signOut();

  if (signOutError) {
    console.error("Sign-out error:", signOutError);
    return { error: signOutError };
  }

  console.log("Sign-out successful");
  return { message: "Sign-out successful" };
}

// // Example usage
// signOut()
//   .then(response => {
//     if (response.error) {
//       console.error('Error during sign-out:', response.error);
//     } else {
//       console.log(response.message);
//     }
//   });
