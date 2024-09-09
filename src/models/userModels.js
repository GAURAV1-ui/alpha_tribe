import mongoose,{Schema} from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'is invalid'],
      },
      password: {
        type: String,
        required: true,
        minlength: 6,
      },
      bio: {
        type: String,
        default: '',
      },
      profilePicture: {
        type: String, //url cloudinary
        default: '',
      },
    }, { timestamps: true });

    const User = mongoose.model('User', userSchema);