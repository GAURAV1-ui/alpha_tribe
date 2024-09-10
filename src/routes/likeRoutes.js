
import express from 'express';

import { likePost} from '../controllers/likeController.js';
import { verifyJWT } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post("/:postId/like",verifyJWT, likePost);

export default router;