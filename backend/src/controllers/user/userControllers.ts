import { Request,Response } from "express"

export const registerUser = async(req:Request,res:Response)=>{
try{

}catch(error){
return res.status(400).json({message:"Invalid user data"})
}
}