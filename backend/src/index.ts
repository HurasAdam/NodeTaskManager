import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import morgan from "morgan";
import connectDB from "./config/db";

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cors({
    origin:process.env.FRONTEND_URL,
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}))

connectDB().then(()=>{
    app.listen(PORT,()=>console.log("Server is running on port",PORT))
});