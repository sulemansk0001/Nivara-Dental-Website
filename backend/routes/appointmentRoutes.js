import express from 'express';
import {
  createAppointment,
  getAppointments,
  updateAppointmentStatus
} from '../controllers/appointmentController.js';
import { requireAdminAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', createAppointment);
router.get('/', requireAdminAuth, getAppointments);
router.patch('/:id/status', requireAdminAuth, updateAppointmentStatus);

export default router;
