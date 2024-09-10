import express from 'express';
import { Router } from 'express';

import { likePost} from '../controllers/likeController.js';
import { verifyJWT } from '../middlewares/authMiddleware.js';

const router = Router();

router.post("/:postId/like",verifyJWT, likePost);

export default router;