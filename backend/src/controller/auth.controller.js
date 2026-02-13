import { loginService, registerService } from "../service/auth.service.js";
import { SEVEN_DAYS, COOKIE_OPTIONS } from "../utils/constants.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await loginService(email, password);

    res.cookie("token", result.token, {
      ...COOKIE_OPTIONS,
      maxAge: SEVEN_DAYS
    })

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
    const { username, email, password, role } = req.body;

    const result = await registerService(username, email, password, role);
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
      ...COOKIE_OPTIONS
    });

    res.status(200).json({
      message: "Logout Successfull",
    });
  } catch (error) {
    console.error("Logout error", error);
    res.status(500).json({ message: "Logout failed" });
  }
};
