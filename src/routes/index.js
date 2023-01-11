import express from "express";

import authRoutes from './auth/index.js';
import pagesRouter from './pages/index.js';

import productsRoutes from './products/index.js'
import messagesRoutes from './messages/index.js'


const router = express.Router();


router.use(pagesRouter)
router.use('/api/auth', authRoutes);

router.use('/api', productsRoutes)
router.use('/api', messagesRoutes);

export default router;