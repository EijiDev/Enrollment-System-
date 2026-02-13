import jwt from "jsonwebtoken";

export const generateToken = async (user_id) => {
  return jwt.sign(
    { user: user_id }, //payload
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN },
  );
};

export const verifyToken = async (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};
