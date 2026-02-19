import { verifyToken } from '../utils/jwt.js';
import User from '../models/user.model.js';
import { USER_ROLES } from '../utils/constants.js';

export const verifyAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ message: 'Invalid or Expired Token' });
    }

    const user = await User.findUserById(decoded.user_id);
    if (!user) {
      return res.status(401).json({ message: 'User Not Found' });
    }

    req.user = {
      userId: user.user_id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({ message: 'Authentication failed' });
  }
};

export const isAdmin = async (req, res, next) => {
    if(req.user.role !== USER_ROLES.ADMIN) {
        return res.status(403).json({ message: "Access denied. Admin Only"});
    }
    next();
}

export const isTeacher = async (req, res, next) => {
    if(req.user.role !== USER_ROLES.TEACHER && req.user.role !== USER_ROLES.ADMIN) {
        return res.status(403).json({ message: "Acess denied. Teacher Only"})
    }
    next();
}

export const isStudent = async (req, res, next) => {
    if(req.user.role !== USER_ROLES.STUDENT) {
        return res.status(403).json({ message: "Access denied. Student only."});
    }
    next();
}

export const isTeacherOrAdmin = (req, res, next) => {
    if (req.user.role !== USER_ROLES.TEACHER && req.user.role !== USER_ROLES.ADMIN) {
        return res.status(403).json({ message: "Access denied." });
    }
    next();
};