import db from '../config/database.js';
import bcrypt from 'bcryptjs';

const User = {
  async create({
    name,
    email,
    password,
    role,
    contact_number,
    address,
    date_of_birth,
    gender,
  }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const results = await db.query(
      `INSERT INTO users
      (name, email, password, role, contact_number, address, date_of_birth, gender)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8) 
      RETURNING user_id, name, email, role, contact_number, address, date_of_birth, gender
      `,
      [
        name,
        email,
        hashedPassword,
        role,
        contact_number,
        address,
        date_of_birth,
        gender,
      ]
    );
    return results.rows[0];
  },

  async findUserByEmail(email) {
    const results = await db.query('SELECT * FROM users WHERE email = $1', [
      email,
    ]);
    return results.rows[0];
  },

  async findUserById(user_id) {
    const results = await db.query(
      'SELECT user_id, name, email, role, contact_number, address, date_of_birth, gender, created_at FROM users WHERE user_id = $1',
      [user_id]
    );
    return results.rows[0];
  },

  async updateUser(user_id, updates) {
    const fields = [];
    const values = [];
    let paramCount = 1;

    Object.keys(updates).forEach((key) => {
      if (updates[key] !== undefined) {
        fields.push(`${key} = $${paramCount}`);
        values.push(updates[key]);
        paramCount++;
      }
    });

    if (fields.length === 0) return null;
    values.push(user_id);

    const query = `UPDATE users SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP
                  WHERE user_id = $${paramCount}
                  RETURNING user_id, name, email, role, contact_number, address, date_of_birth, gender
    `;
    const result = await db.query(query, values);
    return result.rows[0];
  },

  async deleteUser(user_id) {
    const results = await db.query(
      'DELETE FROM users WHERE user_id = $1 RETURNING user_id',
      [user_id]
    );
    return results.rows[0];
  },

  async getAllUsers(role = null) {
    let query = `SELECT user_id, name, email, role, contact_number, created_at FROM users`;
    const params = [];

    if (role) {
      query += ` WHERE role = $1`;
      params.push(role);
    }

    query += ` ORDER BY created_at DESC`;
    const results = await db.query(query, params);
    return results.rows;
  },
};

export default User;
