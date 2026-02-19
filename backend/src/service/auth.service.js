import User from '../models/user.model.js';
import Student from '../models/student.model.js';
import { compare } from 'bcryptjs';
import { generateToken } from '../utils/jwt.js';
import {
  isValidEmail,
  isStrongPassword,
  isValidLRN,
} from '../utils/validation.js';
import { USER_ROLES } from '../utils/constants.js';

export const loginService = async (email, password) => {
  if (!email || !password) {
    throw new Error('All fields are required');
  }

  if (!isValidEmail(email)) {
    throw new Error('Invalid email format');
  }

  const user = await User.findUserByEmail(email);
  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isPasswordValid = await compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid credentials');
  }

  const token = generateToken(user.user_id);

  return {
    token,
    user: {
      id: user.user_id,
      name: user.name,
      email: user.email,
    },
  };
};

export const registerStudentService = async ({
  name,
  email,
  password,
  lrn,
  grade_level,
  strand,
  track,
  school_year,
  semester,
  contact_number,
  address,
  date_of_birth,
  gender,
  guardian_name,
  guardian_contact,
}) => {
  if (
    !name ||
    !email ||
    !password ||
    !lrn ||
    !grade_level ||
    !strand ||
    !track
  ) {
    throw new Error('All fields are required');
  }

  if (!isValidEmail(email)) {
    throw new Error('Invalid email format');
  }

  if (!isStrongPassword(password)) {
    throw new Error(
      'Password must be at least 8 characters with uppercase, lowercase, and number'
    );
  }

  if (!isValidLRN(lrn)) {
    throw new Error(
      'Invalid LRN format. Must be exactly 12 digits and cannot be a repeated or sequential number'
    );
  }

  const existingStudent = await Student.findByLrn(lrn);
  if (existingStudent) {
    throw new Error('LRN already registered');
  }

  const user = await User.create({
    name,
    email,
    password,
    role: USER_ROLES.STUDENT,
    contact_number,
    address,
    date_of_birth,
    gender,
  });

  const student = await Student.create({
    user_id: user.user_id,
    lrn,
    grade_level,
    strand,
    track,
    school_year,
    semester,
    guardian_name,
    guardian_contact,
  });

  return {
    user: {
      id: user.user_id,
      name: user.name,
      email: user.email,
      role: user.role,
    },

    student: {
      studentId: student.student_id,
      lrn: student.lrn,
      grade_level: student.grade_level,
      strand: student.strand,
    },
  };
};
