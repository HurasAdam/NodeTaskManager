import mongoose from "mongoose";
import * as types from "../types/index";

const commentSchema = new mongoose.Schema({
    user:{type:mongoose.Types.ObjectId ,ref:"User"},
task:{type:mongoose.Types.ObjectId, ref:"Task"},
description:{type:String, reqired:true},
createdAt:{type:Date, default:()=> new Date()},
likes: [{ type: mongoose.Types.ObjectId, ref: "User" }],
})

const Comment = mongoose.model<types.IComment>("Comment",commentSchema);

export default Comment