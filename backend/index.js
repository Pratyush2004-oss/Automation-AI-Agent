import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import { ENV } from "./config/ENV.js";
import authRoute from "./routes/user.routes.js";
const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/auth", authRoute);

app.use((err, req, res, next) => {
    return res.status(500).json({ message: err.message });
})

const PORT = ENV.PORT || 5000;

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is listening to port: ${PORT}`);  
})