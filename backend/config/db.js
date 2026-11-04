import mongoose from "mongoose";
import { ENV } from "./ENV.js";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(ENV.MONGO_URI);
        console.log(`Database connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(`Unable to connect to database: ${error.message}`);
        process.exit();
    }
}