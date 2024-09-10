import express from "express";
import { createPost, getPosts, getPost, deletePost} from "../controllers/postController.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", verifyJWT, createPost);
router.get("/", getPosts);
router.get("/:postId", getPost)
router.delete("/:postId", verifyJWT, deletePost)

export default router;