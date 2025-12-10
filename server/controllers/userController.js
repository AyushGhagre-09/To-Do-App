import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};

// API to register user
export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    
    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.json({ success: false, message: "User already exists" });
        }
        const newUser = new User({ name, email, password });
        await newUser.save();
        const token = generateToken(newUser._id);
        res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
};

// API to login user
export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                const token = generateToken(user._id);
                return res.json({ success: true, token });
            }
        }

        res.json({ success: false, message: "Invalid email or password" });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

// API to get user
export const getUser = async (req, res) => {
    try {
        const user = req.user;
        res.json({ success: true, user });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}