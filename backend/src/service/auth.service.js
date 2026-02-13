import User from "../model/user.model.js";
import { compare } from "bcryptjs";
import { generateToken } from "../utils/jwt.js";
import { isValidEmail, isStrongPassword } from "../utils/validation.js";

export const loginService = async (email, password) => {
    if(!email || !password) {
        throw new Error("All fields are required");
    }

    if(!isValidEmail(email)) {
        throw new Error("Invalid email format");
    }

    const user = await User.findUserByEmail(email);
    if(!user) {
        throw new Error("Invalid credentials");
    }

    const isPasswordValid = await compare(password, user.password);
    if(!isPasswordValid) {
        throw new Error("Invalid credentials");
    }

    const token = generateToken(user.user_id);

    return {
        token,
        user: {
            id: user.user_id,
            name: user.name,
            email: user.email
        }
    };
};

export const registerService = async (username, email, password, role) => {
    if(!username || !email || !password) {
        throw new Error("All fields are required");
    }

    if(!isStrongPassword(password)) {
        throw new Error("Weak ass password bitch");
    }

    const user = await User.create({ username, email, password, role });
    return {
        user: {
            id: user.user_id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    }
}

