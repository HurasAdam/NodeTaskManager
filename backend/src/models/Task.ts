import mongoose from "mongoose";
import * as types from "../types/index";
import * as enums from "../enums/index";
const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, default: new Date() },
    priority: {
      type: String,
      default: enums.ETaskPriority.Normal,
      enum: Object.values(enums.ETaskPriority),
    },
    stage: {
      type: String,
      default: enums.ETaskStage.Todo,
      enum: Object.values(enums.ETaskStage),
    },
    activities: [
      {
        type: {
          type: String,
          default: enums.ETaskActivityType.Assigned,
          enum: Object.values(enums.ETaskActivityType),
        },
        activity: String,
        date: { type: Date, default: () => new Date() },
        by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      },
    ],

    subTasks: [
      {
        title: String,
        date: Date,
        tag: String,
      },
    ],
    assets: [String],
    team: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    isTrashed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Task = mongoose.model<types.ITaskDocument>("Task", taskSchema);

export default Task;
