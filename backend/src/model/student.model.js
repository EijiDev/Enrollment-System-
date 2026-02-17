import db from '../config/database.js';

const Student = {
  async create({
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
    const results = await db.query(
      `INSERT INTO students(user_id, lrn, grade_level, strand, track, enrollment_status, school_year, semesterm guardian_name, guardian_contact)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *
      `,
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

  async findUserById(user_id) {
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
      WHERE s.lrn = $1
      `, [lrn]
    );
    return results.rows[0];
  },

  async updateEnrollmentStatus(student_id, enrollment_status) {
    const results = await db.query("UPDATE students SET enrollment_status = $1 WHERE student_id = $2 RETURNING *",
      [student_id, enrollment_status]
    );
    return results.rows[0];
  },

  async getAllStudents(filters = {}) {
    const query = `
    SELECT s.*, u.name, u.email u.contact_number
    FROM students s 
    JOIN users u ON s.user_id = u.user_id
    WHERE 1=1 `;

    const params = [];
    const paramCount = 1;

    if(filters.grade_level) {
      query += `AND s.grade_level = $${paramCount}`;
      params.push(filters.grade_level);
      paramCount++;
    }

    if(filters.strand) {
      query += `AND s.strand = $${paramCount}`;
      params.push(filters.strand);
      paramCount++;
    }

    if(filters.school_year) {
      query += `AND s.school_year = $${paramCount}`;
      params.push(filters.school_year);
      paramCount++;
    }

    if(filters.semester) {
      query += `AND s.semester = $${paramCount}`;
      params.push(filters.semester);
      paramCount++;
    }

    if(filters.enrollment_status) {
      query += `AND s.enrollment_status = $${paramCount}`;
      params.push(filters.semester);
      paramCount++;
    }

    query += ` ORDER BY u.name ASC`;   
    const results = await db.query(query, params);
    return results.rows;
  },

  async getStudentsBySection() {

  }
};
  
export default Student;
