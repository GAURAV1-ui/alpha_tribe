import express from "express";
import { createPost, getPosts, getPost} from "../controllers/postController.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", verifyJWT, createPost);
router.get("/", getPosts);
router.get("/:postId", getPost)

export default router;