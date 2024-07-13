import mongoose from "mongoose";
import * as types from "../types/index";
import * as enums from "../enums/index";

const projectSchema = new mongoose.Schema({
    name:{type:String, required:true},
    pm:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
    members:[{type:mongoose.Schema.Types.ObjectId, ref:"User"}],
})

const Project = mongoose.model("Project",projectSchema);

export default Project; 