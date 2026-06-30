
//API controler for creating a new chat

import Chat from "../models/Chat.js"

export const createChat=async(req,res)=>{
    try {
        const userId=req.user._id

        const ChatData={
            userId,
            messages:[],
            name:"New Chat",
            userName:req.user.name
        }
        await Chat.create(ChatData)
        res.json({success:true,message:"Chat created"})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

//API controller to get chats

export const getChats=async(req,res)=>{
    try {
        const userId=req.user._id
        const chats=await Chat.find({userId}).sort({updatedAt:-1})

        res.json({success:true,chats})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

//API controller for deleting
export const deleteChat=async(req,res)=>{
    try {
        const userId=req.user._id
        const {chatId}=req.body
        await Chat.deleteOne({_id:chatId,userId})

        res.json({success:true,message:"Chat deleted"})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}