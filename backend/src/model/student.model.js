import db from '../config/database.js';

const User = {
  async getAllStudents({
    user_id,
    lrn,
    grade_level,
    strand,
    track,
    enrollment_status,
    school_year,
    semester,
    guardian_name,
    guardian_contact,
  }) {
    const results = await db.query('');
  },
};

export default User;
