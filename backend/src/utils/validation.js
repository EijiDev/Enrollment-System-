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
  const lrnRegex = /^\d{12}$/;
  
  if (!lrnRegex.test(lrn)) return false;
  
  if (/^(\d)\1{11}$/.test(lrn)) return false;

  const sequential = '0123456789012345678901234567890';
  if (sequential.includes(lrn)) return false;

  if (lrn.startsWith('0')) return false;

  return true;
};
