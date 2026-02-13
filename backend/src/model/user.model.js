import db from '../config/database.js';
import bcrypt from 'bcryptjs';

const User = {
  async create({ username, email, password,  role = 'student'}) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const users = await db.query(
      'INSERT INTO users(username, email, password, role) VALUES($1, $2, $3, $4) RETURNING *',
      [username, email, hashedPassword, role]
    );
    return users.rows[0];
  },

  async findUserByEmail(email) {
    const userEmail = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    return userEmail.rows[0];
  },

  async findUserById(user_id) {
    const users = await db.query("SELECT * FROM users WHERE user_id = $1", [user_id]);
    return users.rows[0];
  }
};

export default User;
