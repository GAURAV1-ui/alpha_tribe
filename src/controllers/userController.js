import {User} from "../models/userModels.js";
import { signJWT } from "../middlewares/authMiddleware.js";

export const createUser = async (req, res) => {
    try {
        const {username, email, password} = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ message: "Please fill in all fields" });
        }
        const isUser = await User.findOne({ email });
        if (isUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        
        const user = await User.create({ username, email, password});
        await user.save();

        return res.status(201).json({ success: true, message: 'User registered successfully', userId:user._Id});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Please fill in all fields" });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isPasswordCorrect = await user.isPasswordCorrect(password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const options = {
            httpOnly: true,
            secure: true
        }
        const token = signJWT(user);

        const loggedInUser = await User.findById(user._id).select("-password -bio -profilePicture");

        return res
        .status(200)
        .cookie("accessToken", token, options)
        .json({token, user: loggedInUser});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getUser = async (req, res) => {
    try {
        const {userId} = req.params;
        const user = await User.findById(userId).select("-password");
        return res.status(200).json({id: user._id, username: user.username, bio: user.bio, profilePicture: user.profilePicture});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const updateUser = async (req, res) => {
    try {
        const userId = req.user._id;
        const {username, bio, profilePicture} = req.body;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.username = username || user.username;
        user.bio = bio || user.bio;
        user.profilePicture = profilePicture || user.profilePicture;
        await user.save();
        return res.status(200).json({ success:"true",message: "Profile updated" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}