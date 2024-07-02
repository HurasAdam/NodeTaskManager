import { Request,Response,NextFunction } from "express";
import * as types from "../types/index";
const invalidPathHandler = (req:Request,res:Response,next:NextFunction)=>{
    const error = new Error("Route not found");
    res.status(404);
    next(error);
}

const errorResponseHandler= (err:types.IcustomError,req:Request,res:Response,next:NextFunction)=>{
    let statusCode = res.statusCode ===200 ? 500:res.statusCode;
    let message = err.message;


    if(err.name ==="CastError" && err.kind ==="ObjectId"){
        statusCode=404;
        message="Resource not found";
    }
    res.status(statusCode).json({
        message:message,
        stack:process.env.NODE_ENV !=="production" ? null :err.stack,
    })
}

export {invalidPathHandler,errorResponseHandler};