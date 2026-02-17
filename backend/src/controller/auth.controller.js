import {
  loginService,
  registerStudentService,
} from '../service/auth.service.js';
import { TIME, COOKIE_CONFIG } from '../utils/constants.js';

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await loginService(email, password);

    res.cookie('token', result.token, {
      ...COOKIE_CONFIG,
      maxAge: TIME.SEVEN_DAYS,
    });

    res.status(200).json({
      message: 'Login successful',
      user: result.user,
    });
  } catch (error) {
    if (
      error.message === 'All fields are required' ||
      error.message === 'Invalid email format'
    ) {
      return res.status(400).json({ message: error.message });
    }
    if (error.message === 'Invalid credentials') {
      return res.status(401).json({ message: error.message });
    }
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Login failed' });
  }
};

export const registerStudent = async (req, res) => {
  try {
    const result = await registerStudentService(req.body);

    res.status(201).json({
      message: 'Student registration complete',
      data: result,
    });
  } catch (error) {
    if (error.code === '23505') {
      return res.status(409).json({ message: 'Email or LRN already exists' });
    }

    if (
      error.message.includes('required') ||
      error.message.includes('Invalid') ||
      error.message.includes('must be')
    ) {
      return res.status(400).json({ message: error.message });
    }

    console.log("Student Registration Error", error);
    res.status(500).json({ message: "Registration failed" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie('token', COOKIE_CONFIG);

    res.status(200).json({
      message: 'Logout successful',
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ message: 'Logout failed' });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    res.status(200).json({
      user: req.user,
    });
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({ message: 'Failed to get user info' });
  }
};
