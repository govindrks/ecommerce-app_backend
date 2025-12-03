import { User } from "../models/user.model.js";
import { generateToken } from "../utils/jwt.util.js";
import { hashPassword } from "../utils/password.util.js";

export const registerUser = async ({ name, email, password }) => {
  const existing = await User.findOne({ email });
  if (existing) {
    throw new Error("User already exists with this email");
  }

  const passwordHash = await hashPassword(password);

  const user = await User.create({
    name,
    email,
    passwordHash,
  });

  const token = generateToken({ id: user._id, email: user.email });

  return { user, token };
};


export const loginUser = async ({ email, password }) => {
    if (!email || !password) {
        throw new Error("Email and password are required");
    }

    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("Invalid email or password");
    }

    const isMatched = await comparePassword(password, user.passwordHash);
    if (!isMatched) {
        throw new Error("Invalid email or password");
    }

    const token = generateToken({ id: user._id, email: user.email });

  return { user, token };
}