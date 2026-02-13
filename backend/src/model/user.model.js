import db from "../config/database.js";
import bcrypt from "bcryptjs";

const User = {
    async create({ name, email, password }) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await db.query(
            "INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING user_id, name, email, created_at", 
            [name, email, hashedPassword]
        );
        return result.rows[0];
    },

    async findUserByEmail(email) {
        const result = await db.query(
            "SELECT * FROM users WHERE email = $1", 
            [email]
        );
        return result.rows[0];
    },

    async findUserById(user_id) {
        const result = await db.query(
            "SELECT user_id, name, email, created_at FROM users WHERE user_id = $1", 
            [user_id]
        );
        return result.rows[0];
    }
}

export default User;