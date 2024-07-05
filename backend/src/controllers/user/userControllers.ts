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
   
    res.status(200).json({
        name:user?.name,
        email:user?.email,
        isAdmin:user?.isAdmin,
        role:user?.role,
        title:user?.title
    })
    
const token = user.generateJWT();

res.cookie("auth_token",token,{
    httpOnly:true,
    secure:process.env.NODE_ENV==="production",
    maxAge:86400000,
    sameSite:"strict"
})

}else{
    res.status(400).json({message:"Invalid user data"})
}

}catch(error){
return res.status(400).json({message:"Invalid user data"})
}
}

export const loginUser = async(req:Request,res:Response)=>{
 try{
    const {email,password}=req.body;
    const user = await User.findOne({email});
    if(!user){
        return res.status(400).json({message:"Invalid email or password"});
    }
    
if( await user.comparePassword(password)){
    const token = user.generateJWT();
    
    res.cookie("auth_token",token,{
        httpOnly:true,
        secure:process.env.NODE_ENV==="production",
        maxAge:86400000,
        sameSite:"strict"
    })
}
 
 }catch(error){
    res.status(400).json({message:error})
 }
   
    }
  
    
