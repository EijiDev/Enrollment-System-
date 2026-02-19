export const TIME = {
    SEVEN_DAYS: 7 * 24 * 60 * 60 * 1000,
    ONE_DAY: 24 * 60 * 60 * 1000,
    ONE_HOUR: 60 * 60 * 1000
};

export const COOKIE_CONFIG = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict"
};

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,

  // 4xx Client Errors
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  TOO_MANY_REQUESTS: 429,

  INTERNAL_SERVER_ERROR: 500
};

export const PASSING_GRADE = 75;

export const GRADE_REMARKS = {
    PASSED: 'Passed',
    FAILED: 'Failed',
    INCOMPLETE: 'Incomplete',
    DROPPED: 'Dropped'
};

export const ENROLLMENT_STATUS = {
    PENDING: 'pending',
    ENROLLED: 'enrolled',
    GRADUATED: 'graduated',
    DROPPED: 'dropped'
};

export const USER_ROLES = {
    ADMIN: 'admin',
    TEACHER: 'teacher',
    STUDENT: 'student'
};

export const GRADE_LEVELS = [11, 12];

export const STRANDS = {
    STEM: 'STEM',
    ABM: 'ABM',
    HUMSS: 'HUMSS',
    GAS: 'GAS',
    TVL: 'TVL'
};

export const TRACKS = {
    ACADEMIC: 'Academic',
    TVL: 'TVL'
};

export const SEMESTERS = [1, 2];

export const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const ATTENDANCE_STATUS = {
    PRESENT: 'Present',
    ABSENT: 'Absent',
    LATE: 'Late',
    EXCUSED: 'Excused'
};

export const GRADE_COMPONENT_TYPES = {
    WRITTEN_WORK: 'Written Work',
    PERFORMANCE_TASK: 'Performance Task',
    QUARTERLY_EXAM: 'Quarterly Exam'
};

export const GRADE_WEIGHTS = {
    WRITTEN_WORK: 30,
    PERFORMANCE_TASK: 50,
    QUARTERLY_EXAM: 20
};