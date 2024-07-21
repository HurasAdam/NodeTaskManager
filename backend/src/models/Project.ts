import mongoose from "mongoose";
import * as types from "../types/index";
import * as enums from "../enums/index";

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  pm: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  status: { type: String, default: enums.EProjectStatusType.InProgress },
  overview: [
    {
      header: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
    },
  ],
  activities: [
    {
      type: {
        type: String,
        default: enums.EProjectActivityType.Created,
        enum: Object.values(enums.EProjectActivityType),
      },
      activity: String,
      date: { type: Date, default: () => new Date() },
      by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
  ],
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Project = mongoose.model("Project", projectSchema);

export default Project;
