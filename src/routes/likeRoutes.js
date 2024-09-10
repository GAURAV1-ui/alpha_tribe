
import express from 'express';

import { likePost} from '../controllers/likeController.js';
import { verifyJWT } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post("/:postId/like",verifyJWT, likePost);

export default router;


/**
 * @swagger
 * tags:
 *   name: Likes
 *   description: API endpoints for liking and unliking posts
 */

/**
 * @swagger
 * /api/posts/{postId}/like:
 *   post:
 *     summary: Like a post
 *     tags: [Likes]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the post to like
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Post liked successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       401:
 *         description: Unauthorized, invalid token
 *       404:
 *         description: Post not found
 *       500:
 *         description: Server error
 */
