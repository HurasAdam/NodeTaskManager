import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import mongoose from "mongoose";
import * as types from "../types/index";


const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        title: { type: String, required: true },
        role: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        isAdmin: { type: Boolean, required: true, default: false },
        tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
        isActive: { type: Boolean, required: true, default: true },
      },
      { timestamps: true }
);

userSchema.pre("save", async function (next) {
    if (this.isDirectModified("password")) {
        const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      return next();
    }
    return next();
  });


userSchema.methods.comparePassword = async function(enteredPassword:string):Promise<boolean>{
    return await bcrypt.compare(enteredPassword,this.password);
    };

userSchema.methods.generateJWT = async function(){
    return await jsonwebtoken.sign({id:this._id},process.env.JWT_SECRET as string,{
        expiresIn:"30d"
    })
}


const User = mongoose.model<types.IuserDocument>("User",userSchema);
export default User;