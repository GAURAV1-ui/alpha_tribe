import express from "express";
import { createComment,deleteComment } from "../controllers/commentController.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/:postId/comments",verifyJWT, createComment);
router.delete("/:postId/comments/:commentId", verifyJWT, deleteComment);

export default router;


/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: API endpoints for managing comments on posts
 */

/**
 * @swagger
 * /api/posts/{postId}/comments:
 *   post:
 *     summary: Create a comment on a post
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the post to comment on
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: The content of the comment
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       201:
 *         description: Comment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 commentId:
 *                   type: string
 *                   description: ID of the created comment
 *                 message:
 *                   type: string
 *       400:
 *         description: Invalid post ID or missing content
 *       401:
 *         description: Unauthorized request
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/posts/{postId}/comments/{commentId}:
 *   delete:
 *     summary: Delete a comment from a post
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the post containing the comment
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the comment to delete
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       400:
 *         description: Invalid comment ID
 *       403:
 *         description: Unauthorized request
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Server error
 */


