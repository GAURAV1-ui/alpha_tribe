import { Router } from "express";
import { createUser,loginUser,getUser } from "../controllers/userController.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/auth/register", createUser)
router.post("/auth/login", loginUser)
router.get("/user/profile/:userId",verifyJWT, getUser)

export default router;