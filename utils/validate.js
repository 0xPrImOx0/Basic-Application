const EmailRegex = /^[a-zA-Z0-9._]+@[a-zA-Z0-9.]+\.[a-zA-Z]{2,}$/;

const EmailChecker = (email) => {
  return !email
    ? "This field is required"
    : !EmailRegex.test(email)
    ? "Please input valid email address"
    : "";
};

const PasswordChecker = (password) => {
  return !password
    ? "This field is required"
    : password.length < 6
    ? "Password must have at least 6 characters"
    : password.length > 50
    ? "Password must not exceed 50 characters"
    : "";
};

const ConfirmPasswordChecker = (password, confirmPassword) => {
  return (
    PasswordChecker(confirmPassword) ||
    (confirmPassword !== password ? "Passwords doesn't match" : "")
  );
};

export { EmailChecker, PasswordChecker, ConfirmPasswordChecker };
