import express from 'express';
import {
  createEnquiry,
  getEnquiries,
  updateEnquiryStatus
} from '../controllers/enquiryController.js';
import { requireAdminAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', createEnquiry);
router.get('/', requireAdminAuth, getEnquiries);
router.patch('/:id/status', requireAdminAuth, updateEnquiryStatus);

export default router;
