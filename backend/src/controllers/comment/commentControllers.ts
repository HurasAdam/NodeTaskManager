import { Request,Response } from "express"
import Comment from "../../models/Comment";

export const createComment = async(req:Request,res:Response)=>{
try{
const {taskId,description} = req.body;
const { userId } = req.user;

const newComment = await Comment.create({
    user:userId,
    task:taskId,
    description,
})
const savedNewComment = await newComment.save();
if(savedNewComment){
    res.status(201).json({message:"Comment has been added"})
}
}catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "An unexpected error has occured" });
  }
}

export const getComments = async(req:Request,res:Response)=>{
    try{

const comments= await Comment.find({}).populate([{
  path:"user", select :["name","email","role","isAdmin"]
}]);



res.status(200).json(comments);


    }catch (error) {
        if (error instanceof Error) {
          return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: "An unexpected error has occured" });
      }
    }