import mongoose from "mongoose";
import * as enums from "../enums/index";
export interface IcustomError extends Error{
    kind?:string;
}

export interface IuserDocument extends IUser, Document{
    generateJWT():Promise<string>;
    comparePassword(password:string):Promise<boolean>;
}


export interface ITaskDocument extends ITask, Document {}



export interface IUser{
    name: string;
    title: string;
    role: string;
    email: string;
    password: string;
    isAdmin: boolean;
    tasks: string[];
    isActive: boolean
}



export interface ITask{
    title:string;
    date:Date;
    team:mongoose.Schema.Types.ObjectId[];
    stage:enums.ETaskStage;
    description:string;
    priority:enums.ETaskPriority;
    activity:ITaskActivity[];
    subTasks:ISubTask[];
    assets:string[];
    isTrashed:boolean;
}


export interface ITaskActivity{
    type: enums.ETaskActivityType;
    activity: string;
    date: Date;
    by: mongoose.Schema.Types.ObjectId;
}

interface ISubTask {
    title: string;
    date: Date;
    tag: string;
  }



