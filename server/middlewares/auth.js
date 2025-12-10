import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const protect = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.json({ success: false, message: "token missing" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.json({ success: false, message: "Not authorized, user not found" });
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ success: false, message: "Not authorized, token failed" });
    }
}