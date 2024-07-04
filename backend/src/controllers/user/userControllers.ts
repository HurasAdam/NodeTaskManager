import { Request,Response } from "express"
import User from "../../models/User";

export const registerUser = async(req:Request,res:Response)=>{
try{
const {name,email,password,isAdmin,role,title}=req.body;
const userExist = await User.findOne({email});
if(userExist){
    return res.status(400).json({message:"Email already taken"});
}

const user = await User.create(
{name,email,password,isAdmin,role,title}
)

if(user){
    isAdmin ? await user.generateJWT() : null;
    res.status(200).json({
        name:user?.name,
        email:user?.email,
        isAdmin:user?.isAdmin,
        role:user?.role,
        title:user?.title
    })
}else{
    res.status(400).json({message:"Invalid user data"})
}

}catch(error){
return res.status(400).json({message:"Invalid user data"})
}
}