import db from '../config/database.js';

const Student = {
  async create({
    user_id,
    lrn,
    grade_level,
    strand,
    track,
    enrollment_status = 'pending',
    school_year,
    semester,
    guardian_name,
    guardian_contact,
  }) {
    const results = await db.query(
      `INSERT INTO students(user_id, lrn, grade_level, strand, track, enrollment_status, school_year, semester, guardian_name, guardian_contact)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
      RETURNING *`,
      [
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
      ]
    );
    return results.rows[0];
  },

  async findByUserId(user_id) { 
    const results = await db.query(
      `SELECT s.*, u.name, u.email, u.contact_number, u.address, u.date_of_birth, u.gender
      FROM students s
      JOIN users u ON s.user_id = u.user_id
      WHERE s.user_id = $1`,
      [user_id]
    );
    return results.rows[0];
  },

  async findByStudentId(student_id) {
    const results = await db.query(
      `SELECT s.*, u.name, u.email, u.contact_number, u.address, u.date_of_birth, u.gender
      FROM students s
      JOIN users u ON s.user_id = u.user_id
      WHERE s.student_id = $1`,
      [student_id]
    );
    return results.rows[0];
  },

  async findByLrn(lrn) { 
    const results = await db.query(
      `SELECT s.*, u.name, u.email
      FROM students s
      JOIN users u ON s.user_id = u.user_id
      WHERE s.lrn = $1`,
      [lrn]
    );
    return results.rows[0];
  },

  async updateEnrollmentStatus(student_id, enrollment_status) {
    const results = await db.query(
      `UPDATE students 
       SET enrollment_status = $1 
       WHERE student_id = $2 
       RETURNING *`,
      [enrollment_status, student_id] 
    );
    return results.rows[0];
  },

  async getAllStudents(filters = {}) {
    let query = `
      SELECT s.*, u.name, u.email, u.contact_number
      FROM students s 
      JOIN users u ON s.user_id = u.user_id
      WHERE 1=1`; 

    const params = [];
    let paramCount = 1; 

    if (filters.grade_level) {
      query += ` AND s.grade_level = $${paramCount}`; 
      params.push(filters.grade_level);
      paramCount++;
    }

    if (filters.strand) {
      query += ` AND s.strand = $${paramCount}`;
      params.push(filters.strand);
      paramCount++;
    }

    if (filters.school_year) {
      query += ` AND s.school_year = $${paramCount}`;
      params.push(filters.school_year);
      paramCount++;
    }

    if (filters.semester) {
      query += ` AND s.semester = $${paramCount}`;
      params.push(filters.semester);
      paramCount++;
    }

    if (filters.enrollment_status) {
      query += ` AND s.enrollment_status = $${paramCount}`;
      params.push(filters.enrollment_status); 
      paramCount++;
    }

    query += ` ORDER BY u.name ASC`;

    const results = await db.query(query, params);
    return results.rows;
  },

  async getStudentsBySection(section_id) { 
    const results = await db.query(
      `SELECT s.*, u.name, u.email, u.contact_number, e.enrollment_id
       FROM students s
       JOIN users u ON s.user_id = u.user_id
       JOIN enrollments e ON s.student_id = e.student_id
       WHERE e.section_id = $1 AND e.status = 'active'
       ORDER BY u.name ASC`,
      [section_id]
    );
    return results.rows;
  }
};
  
export default Student;