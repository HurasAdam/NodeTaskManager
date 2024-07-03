import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import morgan from "morgan";
import connectDB from "./config/db";
import { errorResponseHandler, invalidPathHandler } from "./middlewares/errorMiddleware";
import routes from "./routes/index";

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors({
    origin:process.env.FRONTEND_URL,
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}))
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(morgan("dev"));
app.use("/api",routes);
 app.use(invalidPathHandler);
 app.use(errorResponseHandler);

connectDB().then(()=>{
    app.listen(PORT,()=>console.log("Server is running on port",PORT))
});