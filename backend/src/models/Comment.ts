import mongoose from "mongoose";


const commentSchema = new mongoose.Schema({
    user:{type:mongoose.Types.ObjectId ,ref:"User"},
task:{type:mongoose.Types.ObjectId, ref:"Task"},
description:{type:String, reqired:true},
createdAt:{type:Date, default:()=> new Date()}

})

const Comment = mongoose.model("Comment",commentSchema);

export default Comment