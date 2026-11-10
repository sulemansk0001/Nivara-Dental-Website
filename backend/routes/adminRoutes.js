import express from 'express';
import { adminLogin, getDashboardOverview } from '../controllers/adminController.js';
import { requireAdminAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', adminLogin);
router.get('/overview', requireAdminAuth, getDashboardOverview);

export default router;
