import jwt from "jsonwebtoken"
import { User } from "../models/userModels.js";

export const signJWT = (user) => {
    if (!user) {
        return null
    }
    
    return jwt.sign({ _id: user._id },process.env.TOKEN_SECRET,{ expiresIn: "24h" })
}

export const verifyJWT = async(req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        if (!token) {
            res.status(401).json("Unauthorized request")
        }
    
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET)
    
        const user = await User.findById(decodedToken?._id).select("-password")
    
        if (!user) {
            res.status(401).json("Invalid Access Token")
        }
    
        req.user = user;
        next()
    } catch (error) {
        res.status(401).json(error?.message || "Invalid access token")
    }
    
}

