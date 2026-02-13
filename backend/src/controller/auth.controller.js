import { loginService, registerService } from "../service/auth.service.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await loginService(email, password);

    res.cookie("token", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, //7days in milliseconds
    });

    res.status(200).json({
      message: "Login Successful",
      user: result.user,
    });
  } catch (error) {
    if (error.message === "All fields are required") {
      return res.status(400).json({ message: error.message });
    }
    if (error.message === "Invalid credentials") {
      return res.status(401).json({ message: error.message });
    }
    res.status(500).json({ message: "Log in failed" });
  }
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const result = await registerService(name, email, password);
    res.status(201).json({
      message: "Sucessfully Created",
      user: result.user,
    });
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({ message: "Email already exists" });
    }
    console.error("Register Error:", error);
    res.status(500).json({ error: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict"
    });

    res.status(200).json({
      message: "Logout Successfull",
    });
  } catch (error) {
    console.error("Logout error", error);
    res.status(500).json({ message: "Logout failed" });
  }
};
