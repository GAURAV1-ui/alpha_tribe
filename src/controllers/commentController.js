import mongoose from "mongoose";
import { Comment } from "../models/commentModel.js";

export const createComment = async (req, res) => { 
    
    try {
        const { postId } = req.params;
        const { content } = req.body;
        
        if(!content) {
            return res.status(400).json({ message: "Please fill in all fields" });
        }
        if(!mongoose.Types.ObjectId.isValid(postId)) {
            return res.status(400).json({ message: "Invalid post ID" });
        }
        const user = req.user;
        if(!user) {
            return res.status(401).json({ message: "Unauthorized request" });
        }
        const newComment = new Comment({ user: user._id, post: postId,  content});
        if (!newComment) {
            return res.status(500).json({ message: "Server error" });
        }
        const savedPost = await newComment.save();
        return res.status(201).json({success: true, commentId:savedPost._id, message: "Comment created successfully", commentId: newComment._id}););
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}