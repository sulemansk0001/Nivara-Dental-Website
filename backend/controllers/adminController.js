import { localStore } from '../data/localStore.js';
import { Appointment } from '../models/Appointment.js';
import { Enquiry } from '../models/Enquiry.js';
import mongoose from 'mongoose';

export const adminLogin = (req, res) => {
  const { password } = req.body;
  const adminSecret = process.env.ADMIN_SECRET_KEY || 'nivara_admin_secure_key_2026';

  if (!password || password !== adminSecret) {
    return res.status(401).json({
      success: false,
      message: 'Invalid administrative password.'
    });
  }

  return res.json({
    success: true,
    message: 'Admin authentication successful.',
    token: adminSecret,
    adminUser: {
      role: 'SuperAdmin',
      clinic: 'Nivara Dental Studio',
      location: 'Pune, Maharashtra'
    }
  });
};

export const getDashboardOverview = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const totalAppointments = await Appointment.countDocuments();
      const pendingAppointments = await Appointment.countDocuments({ appointmentStatus: 'pending' });
      const confirmedAppointments = await Appointment.countDocuments({ appointmentStatus: 'confirmed' });
      const completedAppointments = await Appointment.countDocuments({ appointmentStatus: 'completed' });
      const totalEnquiries = await Enquiry.countDocuments();
      const newEnquiries = await Enquiry.countDocuments({ enquiryStatus: 'new' });

      return res.json({
        success: true,
        stats: {
          totalAppointments,
          pendingAppointments,
          confirmedAppointments,
          completedAppointments,
          totalEnquiries,
          newEnquiries,
          totalDoctors: localStore.getDoctors().length,
          totalServices: localStore.getServices().length,
          totalBlogs: localStore.getBlogs().length
        }
      });
    }

    const stats = localStore.getStats();
    return res.json({ success: true, stats });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
