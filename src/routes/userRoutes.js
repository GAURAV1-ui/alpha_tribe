import { Router } from "express";
import { createUser,loginUser,getUser,updateUser } from "../controllers/userController.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/multer.js";

const router = Router();

router.post("/auth/register", createUser)
router.post("/auth/login", loginUser)
router.get("/user/profile/:userId",verifyJWT, getUser)
router.put("/user/profile",verifyJWT, upload.single("profilePicture"), updateUser)


export default router;