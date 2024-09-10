import mongoose from "mongoose";
import {Post} from "../models/postModel.js";

export const likePost = async (req, res) => {
    try {
        const { postId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return res.status(400).json({ message: 'Invalid post ID' });
        }
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        if (post.likes.includes(req.user._id)) {
            post.likes = post.likes.filter((id) => id.toString() !== req.user._id.toString());
            await post.save();
            return res.status(200).json({ success: 'true', message: 'Post unliked successfully' });
        } else {
            post.likes.push(req.user._id);
            await post.save();
            return res.status(200).json({ success: 'true', message: 'Post liked successfully' });
        }
        
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}