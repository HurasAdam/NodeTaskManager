import { Request,Response } from "express"
import Project from "../../models/Project";
export const createProject = async(req:Request,res:Response)=>{
try{

    const {userId,userName}=req.user;
    const {name,pm,members,target,description}=req.body;

    const project = await Project.findOne({name});

    if(project){
        return res.status(400).json({message:"Project with that name already exist. Project name must be unique."})
    }

    const text= `Project created by: ${userName}`
  


    const activity={
        type:"created",
        activity:text,
        by:userId
    }

    const newProject = await Project.create({
   name,
   pm,
   members,
   overview:[{header:"Project Objectives",content:target},{header:"Project Description",content:description}],
   activities:activity
    })
  const savedProject = await newProject.save();

  if(savedProject){
    res.status(201).json({message:"Project has been created"})
  }

}catch(error){
    if(error instanceof Error){
        return res.status(400).json({message:error.message})
    }
    res.status(500).json({message:"An unexpected error has occured"})
}
}

export const getProjects = async(req:Request,res:Response)=>{
try{
    const projects = await Project.find({}).populate([
        {path:"pm", select:["name","email"]},
        {path:"members", select:["name","email"]},
]);

    if(!projects){
        return res.status(200).json([])
    }
    res.status(200).json(projects);

}catch(error){
    if(error instanceof Error){
        return res.status(400).json({message:error.message});
    }
    res.status(500).json({message:"An unexpected error has occured"})
}
}


export const getProject = async(req:Request, res:Response)=>{
try{

const {id}=req.params;

const project = await Project.findById(id);

if(!project){
    return res.status(404).json({message:"Project not found"})
}

res.status(200).json(project)

}catch(error){
    if(error instanceof Error){
        return res.status(400).json({message:error.message})
    }
    res.status(500).json({message:"An unexpected error has occured"})
}
}