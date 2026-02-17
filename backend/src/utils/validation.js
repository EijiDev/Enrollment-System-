export const isValidEmail = async (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const isStrongPassword = async (password) => {
  return (
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password)
  );
};

export const isValidNumber = async (contact_number) => {
  return /^(09|\+639)\d{9}$/.test(phone);
};

export const isValidLRN = (lrn) => {
  if (!lrn) return false;
  const lrnStr = String(lrn);
  const lrnRegex = /^\d{12}$/;
  
  return lrnRegex.test(lrnStr);
};
