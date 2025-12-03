import { registerUser } from "../services/auth.service.js";

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const { user, token } = await registerUser({ name, email, password });

        const safeUser = {
            id: user._id,
            name: user.name,
            email: user.email,}

        res.status(201).json({ 
            success: true,
            menubaressage: "User registered successfully",
            user: safeUser, token });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}


export const login = async (req, res) => {
    try {
        const { email, password }  =req.body;

        const { user, token } = await loginUser({ email, password });

        const safeUser = {
            id: user._id,
            name: user.name,
            email: user.email,
        };

        res.status(200).json({ 
            success: true,
            message: "User logged in successfully",
            user: safeUser, token });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}