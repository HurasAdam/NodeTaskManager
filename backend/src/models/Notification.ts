import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    team:[{type:mongoose.Schema.Types.ObjectId, ref:"User"}],
    text:{type:String},
    task:{type:mongoose.Schema.Types.ObjectId, ref:"Task"},
    notificationType:{type:String, default:"alert",enum:["alert","message"]},
    isRead:[{type:mongoose.Types.ObjectId, ref:"User"}],
},
{timestamps:true}

)

const Notification = mongoose.model("Notification",notificationSchema);
export default Notification;