import {Request,Response} from "express";
import Task from "../../models/Task";
import Notification from "../../models/Notification";

export const createTask = async(req:Request,res:Response)=>{
try{
const {title,team,stage,date,priority,description,assets}=req.body;

const task = await Task.create({
    title,
    team,
    stage:stage.toLowerCase(),
    date,
    priority:priority.toLowerCase(),
    description,
    assets
})

let text= "New task has been asigned to you!"

if(task.team.length > 1){
text = `${text} and ${task.team.length - 1} others`
}

text = text + `The task priority is set as ${task.priority} priority, so check and act accordingly. The task date is ${task?.date.toDateString()}`


const notification = await Notification.create({
    team,
    text,
    task:task._id
})



res.status(201).json({message:"Task has been created sucessfully"})
}catch(error){
    if(error instanceof Error){
        return res.status(400).json({message:error.message})
    }
    res.status(500).json({message:"An unexpected error has occured"})
}
}


