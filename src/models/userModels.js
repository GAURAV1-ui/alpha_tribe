import mongoose,{Schema} from "mongoose";
import bcrypt from "bcrypt";

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
        required: [true, 'Password is required'],
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

    userSchema.pre("save", async function(next){
        if(!this.isModified("password")) 
          return next();
        
        this.password = await bcrypt.hash(this.password, 10);
        next();
    })
    
    userSchema.methods.isPasswordCorrect = async function(password){
      console.log(password, this.password)
      return await bcrypt.compare(password, this.password);
    }

   export const User = mongoose.model('User', userSchema);