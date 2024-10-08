import mongoose,{Schema} from "mongoose";

const commentSchema = new Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    postId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Post', 
        required: true 
    },
    content: { 
        type: String, 
        required: true 
    },
    
    }, { timestamps: true });

export const Comment = mongoose.model('Comment', commentSchema);