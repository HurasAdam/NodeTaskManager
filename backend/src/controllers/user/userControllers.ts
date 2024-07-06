import { Request,Response } from "express"
import User from "../../models/User";
import Notification from "../../models/Notification";
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
 res.status(200).json({message:"logged in sucessfully"})
 }catch(error){
    res.status(400).json({message:error})
 }
   
    }


    export const logoutUser= async(req:Request,res:Response)=>{
        try{
res.cookie("auth_token","",{
    expires:new Date(0)
})
res.status(200).json({message:"Logout sucessfull"})
        }catch(error){
            res.status(400).json({message:"Something went wrong"})
        }
    }
  
    
    export const getTeamList = async(req:Request,res:Response)=>{
        try{
const users = await User.find().select("name title role email isActive");
res.status(200).json(users);
        }catch(error){
            if(error instanceof Error){
                return res.status(400).json({message:error.message})
            }
          res.status(500).json({message:"An unexpected error has occured"})
        }
    }

   export const getNotificationsList = async(req:Request,res:Response)=>{
        try{
const {userId}=req.user;

const notice = await Notification.find({
    team: userId,
    isRead: { $nin: [userId] },
  }).populate("task", "title");

res.status(200).json(notice);
        }catch(error){
            if(error instanceof Error){
                return res.status(400).json({message:error.message})
            }
          res.status(500).json({message:"An unexpected error has occured"})
        }
    }


    export const updateUserProfile = async (req:Request,res:Response)=>{
try{
const {userId,isAdmin}=req.user;
const {_id}= req.body;

const id = isAdmin && userId === _id ? userId : isAdmin && userId !==_id ? _id:userId

const user = await User.findById(id)
if(!user){
    return res.status(400).json({message:"User not found"})
}
user.name = req.body.name || user.name;
user.title = req.body.title || user.title;
user.role = req.body.role || user.role;
const updatedUser = await user.save();

res.status(201).json({
    message:"profile updated sucessfully",
    user:updatedUser
})

}catch(error){
    if(error instanceof Error){
        return res.status(400).json({message:error.message})
    }
    res.status(500).json({message:"An unexpected error has occured"})
}
    }


    export const markNotificationRead = async (req:Request,res:Response)=>{
        try{
        const {userId,isAdmin}=req.user;
        const {_id}= req.body;
   const {isReadType,id}=req.query;
   if(isReadType ==='all'){
    await Notification.updateMany({
        team:userId, isRead: {$nin: [userId]}},
        {$push: {isRead: userId}},
        {new:true}
    );
   }else{
    await Notification.findOneAndUpdate({
        _id:id,
        isRead: {$nin: [userId]}},
        {$push: {isRead :userId}}
    )
   }  

   res.status(201).json({message:"Marked as read"})
        }catch(error){
            if(error instanceof Error){
                return res.status(400).json({message:error.message})
            }
            res.status(500).json({message:"An unexpected error has occured"})
        }
            }



export const changeUserPassword = async(req:Request,res:Response)=>{
    try{
const {userId}=req.user;
const user = await User.findById(userId);
if(!user){
    return res.status(400).json({message:"User not found"})
}
user.password = req.body.password;
 const updatedPassword = await user.save();

 if(updatedPassword){
    return res.status(201).json({message:"Password updated sucessfully"})
 }

    }catch(error){
        if( error instanceof Error){
            return res.status(400).json({message:error.message})
        }
        res.status(500).json({message:"An unexpected error has occured"})
    }
}


export const activateUserProfile = async(req:Request,res:Response)=>{
    try{
const {id}=req.params;
const user = await User.findById(id);

if(!user){
    return res.status(400).json({message:"User not found"});
}

user.isActive = req.body.isActive;
await user.save();
res.status(201).json({
    message:`User account has been ${user?.isActive ? "activated" :"disabled"}`
})

    }catch(error){
        if( error instanceof Error){
            return res.status(400).json({message:error.message})
        }
        res.status(500).json({message:"An unexpected error has occured"})
    }
}

export const deleteUserProfile = async(req:Request,res:Response)=>{
    try{

const {id}=req.params;

const user = await User.findById(id);

if(!user){
    return res.status(400).json({message:"User not found"});
}
const deletedUser = await User.findByIdAndDelete(id);

if(deletedUser){
    return res.status(201).json({message:"User account deleted sucessfully"})
}

    }catch(error){
        if( error instanceof Error){
            return res.status(400).json({message:error.message})
        }
        res.status(500).json({message:"An unexpected error has occured"})
    }
}