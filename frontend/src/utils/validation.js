export const validateRequired = (value) => {
  return value.trim() !== "" ? "" : "**This field is required**";
};

export const validateMinLength = (value, minLength) => {
  return value.trim().length >= minLength
    ? ""
    : `This field must be at least ${minLength} characters long`;
};

export const validateEmail = (value) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value) ? "" : "Invalid email format";
};

export const validatePassword = (value) => {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return passwordRegex.test(value)
    ? ""
    : "**Password must be at least 8 characters, include letters and numbers**";
};
