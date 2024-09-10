import express from "express";
import { createPost, getPosts, getPost, deletePost} from "../controllers/postController.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", verifyJWT, createPost);
router.get("/", getPosts);
router.get("/:postId", getPost)
router.delete("/:postId", verifyJWT, deletePost)

export default router;

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: API endpoints for managing posts
 */

/**
 * @swagger
 * /api/posts:
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     requestBody:
 *       description: Post details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               stockSymbol:
 *                 type: string
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Post created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 postId:
 *                   type: string
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: Retrieve all posts with optional filters and pagination
 *     tags: [Posts]
 *     parameters:
 *       - in: query
 *         name: stockSymbol
 *         schema:
 *           type: string
 *         description: Filter posts by stock symbol
 *       - in: query
 *         name: tags
 *         schema:
 *           type: string
 *         description: Filter posts by tags (comma-separated)
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [date, like]
 *         description: Sort posts by date or likes
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of posts per page
 *     responses:
 *       200:
 *         description: List of posts with pagination info
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalPosts:
 *                   type: integer
 *                 currentPage:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *                 pageSize:
 *                   type: integer
 *                 posts:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       postId:
 *                         type: string
 *                       stockSymbol:
 *                         type: string
 *                       title:
 *                         type: string
 *                       description:
 *                         type: string
 *                       likesCount:
 *                         type: integer
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/posts/{postId}:
 *   get:
 *     summary: Retrieve a single post with comments
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the post to retrieve
 *     responses:
 *       200:
 *         description: Post details along with comments
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 postId:
 *                   type: string
 *                 stockSymbol:
 *                   type: string
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 likesCount:
 *                   type: integer
 *                 comments:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       commentId:
 *                         type: string
 *                       userId:
 *                         type: string
 *                       comment:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *       400:
 *         description: Invalid post ID
 *       404:
 *         description: Post not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/posts/{postId}:
 *   delete:
 *     summary: Delete a post
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the post to delete
 *     responses:
 *       200:
 *         description: Post deleted successfully
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
 *         description: Invalid post ID
 *       403:
 *         description: Unauthorized request
 *       404:
 *         description: Post not found
 *       500:
 *         description: Server error
 */
