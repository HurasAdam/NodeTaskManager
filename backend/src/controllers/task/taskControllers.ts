import {Request,Response} from "express";
import Task from "../../models/Task";
import Notification from "../../models/Notification";
import * as types from "../../types/index";
import * as enums from "../../enums/index";
import User from "../../models/User";

export const createTask = async(req:Request,res:Response)=>{
try{
const {title,team,stage,date,priority,description,assets}=req.body;
const {userId}=req.user;


let text = "New task has been assigned to you";
if (team?.length > 1) {
  text = text + ` and ${team?.length - 1} others.`;
}

text =
  text +
  ` The task priority is set a ${priority} priority, so check and act accordingly. The task date is ${new Date(
    date
  ).toDateString()}. Thank you!!!`;



const activity={
    type:"assigned",
    activity:text,
    by:userId
}


const task = await Task.create({
    title,
    team,
    stage:stage.toLowerCase(),
    date,
    priority:priority.toLowerCase(),
    description,
    assets,
    activities: activity,
})





const notification = await Notification.create({
    team,
    text,
    task:task._id
})

if(notification){
    res.status(201).json({message:"Task has been created sucessfully"})
}


}catch(error){
    if(error instanceof Error){
        return res.status(400).json({message:error.message})
    }
    res.status(500).json({message:"An unexpected error has occured"})
}
}


export const duplicateTask = async(req:Request,res:Response)=>{
    try{
    const {id}=req.params;

    const task = await Task.findById(id);
if(!task){
    return res.status(400).json({message:"Task not found"});
}
    const duplicatedTask = await Task.create({
        ...task, title:`${task?.title} - Duplicate`
    })

    duplicatedTask.team = task.team;
    duplicatedTask.subTasks = task.subTasks;
    duplicatedTask.assets = task.assets;
    duplicatedTask.priority = task.priority;

    const saveDuplicatedTask = await duplicatedTask.save();


    let text= "New task has been asigned to you!"

    if(task.team.length > 1){
    text = `${text} and ${task.team.length - 1} others`
    }
    
    text = text + `The task priority is set as ${task.priority} priority, so check and act accordingly. The task date is ${task?.date.toDateString()}`
    
    
    const notification = await Notification.create({
        team:duplicatedTask.team,
        text,
        task:duplicatedTask._id
    })
    
    if(notification){
        res.status(201).json({message:"Task has been created sucessfully"})
    }
    


if(saveDuplicatedTask){
    return res.status(201).json({message:"Task duplicated successfully"})
}

    }catch(error){
        if(error instanceof Error){
            return res.status(400).json({message:error.message})
        }
        res.status(500).json({message:"An unexpected error has occured"})
    }
    }



    export const postTaskActivity = async(req:Request,res:Response)=>{
        try{
       
        const {id}=req.params;
        const {userId}=req.user;
        const {type,activity}=req.body;
        
        const task = await Task.findById(id);
if(!task){
    return res.status(400).json({message:"Task not found"})
}
        const data = {
            type,
            activity,
            by:userId,
            date:new Date()
        }
        task.activities.push(data);

        await task.save();

        }catch(error){
            if(error instanceof Error){
                return res.status(400).json({message:error.message})
            }
            res.status(500).json({message:"An unexpected error has occured"})
        }
        }
        
        export const dashboardStatistics = async(req:Request,res:Response)=>{
            try{
           const {userId,isAdmin}=req.user;

           const allTasks = isAdmin ? await  Task.find({
           isTrashed:false,
           }).populate({
            path:"team",
            select:"name role title email"
           }).sort({_id: -1}) 
           :
           await Task.find({
            isTrashed:false,
            team:{$all : [userId]},
           }).populate({
            path:"team",
            select:"name role title email"
           }).sort({_id: -1})

           const users = await User.find({
            isActive:true
           }).select("name title role isAdmin createdAt").limit(10).sort({_id: -1})
    

// group task by stage and calculate counts
const groupTasks: Record<string, number> = {};
allTasks.forEach(task => {
    const stage = task.stage;
    if (!groupTasks[stage]) {
        groupTasks[stage] = 1;
    } else {
        groupTasks[stage]++;
    }
});



   // group tasks by priority
       const groupData: { name: string; total: number }[] = [];
       allTasks.forEach(task => {
           const priority = task.priority;
           const existingItem = groupData.find(item => item.name === priority);
           if (existingItem) {
               existingItem.total++;
           } else {
               groupData.push({ name: priority, total: 1 });
           }
       });

// calcualte total tasks
const totalTasks = allTasks.length
const lastTenTasks = allTasks.slice(0, 10)

const summaryResult = {
    totalTasks,
    lastTenTasks,
    users: isAdmin ? users :[],
    tasks:groupTasks,
    graphData:groupData
};

res.status(200).json(summaryResult)
            }catch(error){
                if(error instanceof Error){
                    return res.status(400).json({message:error.message})
                }
                res.status(500).json({message:"An unexpected error has occured"})
            }
            }



            export const getTasks = async(req:Request,res:Response)=>{
                try{
               
   const {stage,isTrashed}=req.query as {stage?:string, isTrashed?:string};



   let query:any= {isTrashed:isTrashed ? true: false}

   if(stage){
    query.stage=stage;
   }
        let queryResult =  Task.find(query).populate({
            path:"team", 
            select:"name title email"
        }).sort({_id :-1});

const tasks = await queryResult;
res.status(200).json(tasks)

                }catch(error){
                    if(error instanceof Error){
                        return res.status(400).json({message:error.message})
                    }
                    res.status(500).json({message:"An unexpected error has occured"})
                }
                }
                

                export const getTask = async(req:Request,res:Response)=>{
                    try{
                   const {id}=req.params;
                   const task = await Task.findById(id).populate({
                    path:"team", select:"name title role email"
                   }).populate({
                    path:"activities.by",select: "name"
                   }).sort({_id: -1});
      
if(!task){
    return res.status(400).json({message:"Task not found"})
}

                   res.status(200).json(task)

                    }catch(error){
                        if(error instanceof Error){
                            return res.status(400).json({message:error.message})
                        }
                        res.status(500).json({message:"An unexpected error has occured"})
                    }
                    }


                    
                export const createSubTask = async(req:Request,res:Response)=>{
                    try{
                   const {id}=req.params;
                   const {title,tag,date}=req.body;

                   const newSubTask ={
                    title,date,tag
                   }
                   const task = await Task.findById(id);
if(!task){
    return res.status(400).json({message:"Task not found"})
}
task.subTasks.push(newSubTask);

const savedTask = await task.save();

if(savedTask){
    res.status(201).json({message:" Subtask added sucessfully"})
}

                    }catch(error){
                        if(error instanceof Error){
                            return res.status(400).json({message:error.message})
                        }
                        res.status(500).json({message:"An unexpected error has occured"})
                    }
                    }

                    export const updateTask = async(req:Request,res:Response)=>{
                        try{
const {id}=req.params;
    const {title,date,team,stage,priority,description,assets}=req.body;
const task = await Task.findById(id);

if(!task){
    return res.status(400).json({meesage:"Task not found"});
}
task.title=title || task.title
task.date=date || task.date
task.priority=priority || task.priority
task.description=description || task.description
task.assets=assets || task.assets
task.stage=stage || task.stage
task.team=team || task.team

const savedTask = await task.save();

if(savedTask){
    res.status(201).json({message:"Task updated successfully"})
}

                        }catch(error){
                            if(error instanceof Error){
                                return res.status(400).json({message:error.message})
                            }
                            res.status(500).json({message:"An unexpected error has occured"})
                        }
                        }


                        export const trashTask = async(req:Request,res:Response)=>{
                            try{
                      const {id}=req.params;

                    const task = await Task.findById(id);
                    if(!task){
                        return res.status(400).json({message:"Task not found"})
                    }
                    task.isTrashed=true;
                    const trashedTask= await task.save();
                    if(trashedTask){
                        res.status(201).json({message:"Task trashed successfully"})
                    }
    
                            }catch(error){
                                if(error instanceof Error){
                                    return res.status(400).json({message:error.message})
                                }
                                res.status(500).json({message:"An unexpected error has occured"})
                            }
                            }


                            export const deleteRestoreTask = async (req:Request, res:Response) => {
                                try {
                                  const { id } = req.params;
                                  const { actionType } = req.query;
                              
                                  if (actionType === "delete") {
                                    await Task.findByIdAndDelete(id);
                                  } else if (actionType === "deleteAll") {
                                    await Task.deleteMany({ isTrashed: true });
                                  } else if (actionType === "restore") {
                                    const resp = await Task.findById(id);
                              
                                   if(resp){
                                    resp.isTrashed = false;
                                    resp.save();
                                   }
                                  } else if (actionType === "restoreAll") {
                                    await Task.updateMany(
                                      { isTrashed: true },
                                      { $set: { isTrashed: false } }
                                    );
                                  }
                              
                                  res.status(200).json({
                                    status: true,
                                    message: `Operation performed successfully.`,
                                  });
                                } catch (error) {
                                  console.log(error);
                                  if(error instanceof Error){
                                    return res.status(400).json({ message: error.message });
                                  }
                                 res.status(500).json({message:"An unexpected error has occured"})
                                }
                              };