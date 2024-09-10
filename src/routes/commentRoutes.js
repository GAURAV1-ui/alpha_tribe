import express from "express";
import { createComment,deleteComment } from "../controllers/commentController.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/:postId/comments",verifyJWT, createComment);
router.delete("/:postId/comments/:commentId", verifyJWT, deleteComment);

export default router;

