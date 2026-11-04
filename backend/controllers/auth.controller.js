import expressAsyncHandler from "express-async-handler";
import { getAuth } from "firebase-admin/auth";
import { firebaseApp } from "../config/firebase.js";
import UserModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { ENV } from "../config/ENV.js";

/**
 * @login
 * @description login the user
 * @route POST /api/v1/auth/login
 * @body { token: string }
 * @access public
 */
export const login = expressAsyncHandler(async (req, res, next) => {
    try {
        const { token } = req.body;
        if (!token) return res.status(400).json({ message: "Token not found" });

        // verify the token
        const decoded = await getAuth(firebaseApp).verifyIdToken(token);

        // save the user to database if not created..
        const user = await UserModel.findOneAndUpdate({ firebaseUID: decoded.uid },
            {
                $set: {
                    name: decoded.name,
                    email: decoded.email,
                    profilePic: decoded.picture
                },
                $setOnInsert: {
                    firebaseUID: decoded.uid
                },
            }, { upsert: true, returnDocument: "after" });

        // generate token for user
        const jwtToken = jwt.sign({ userId: user._id }, ENV.JWT_SECRET, { expiresIn: "7d" });
        res.cookie("token", jwtToken, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 1000 * 60 * 60 * 24 * 7     // 7 days
        });
        res.status(200).json({
            message: `Welcome ${user.name}`,
            user
        })
    } catch (error) {
        console.log(`Error in login controller: ${error}`);
        next(error);
    }
});

/**
 * @me
 * @description get the user
 * @route GET /api/v1/auth/me
 * @access private
 */
export const me = expressAsyncHandler(async (req, res, next) => {
    try {
        const user = req.user;
        res.status(200).json(user);
    } catch (error) {
        console.log(`Error in me controller: ${error}`);
        next(error);
    }
});

/**
 * @logout
 * @description logout the user
 * @route POST /api/v1/auth/logout
 * @access public
 */
export const logout = expressAsyncHandler(async (req, res, next) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 1000 * 60 * 60 * 24 * 7     // 7 days
        });
        return res.status(200).json({ message: "Logout Successfully" })
    } catch (error) {
        console.log(`Error in logout controller: ${error}`);
        next(error);
    }
});
