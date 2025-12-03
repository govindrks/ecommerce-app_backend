
import bcrypt from 'bcrypt';
const saltRound = Number(process.env.BCRYPT_SALT_ROUNDS) || 10;

export const hashPassword = async (plainPassword) => {
    const salt = await bcrypt.genSalt(saltRound);
    return bcrypt.hash(plainPassword, salt);
}

export const comparePassword = async (plainPassword, passwordHash) => {
    return bcrypt.compare(plainPassword, passwordHash)
}