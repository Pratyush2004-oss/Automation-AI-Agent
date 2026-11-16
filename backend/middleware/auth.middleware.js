import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { ENV } from "../config/ENV.js";
import UserModel from "../models/user.model.js";

/**
 * @isAuth
 * @description verify the token
 * @route *
 * @access private
 * @middleware
 */
export const isAuth = expressAsyncHandler(async (req, res, next) => {
    try {
        // get the token
        const token = req.cookies.token;
        if (!token) return res.status(401).json({ message: "Unauthorized, token not found." });

        // decode the token
        try {
            const decoded = jwt.verify(token, ENV.JWT_SECRET);
            if (!decoded) return res.status(401).json({ message: "Unauthorized, invalid token" });
            // get the user from database
            const user = await UserModel.findById(decoded.userId);
            if (!user) return res.status(401).json({ message: "Unauthorized, user not found" });
    
            req.user = user;
            next();
        } catch (error) {
            return res.status(401).json({ message: "Unauthorized, invalid token" });
        }
    } catch (error) {
        console.log(`Error in isAuth middleware: ${error}`);
        next(error);
    }
})