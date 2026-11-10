import { localStore } from '../data/localStore.js';
import { Doctor } from '../models/Doctor.js';
import mongoose from 'mongoose';

export const getDoctors = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const doctors = await Doctor.find({ status: 'active' });
      if (doctors && doctors.length > 0) {
        return res.json({ success: true, count: doctors.length, doctors });
      }
    }
    const doctors = localStore.getDoctors();
    return res.json({ success: true, count: doctors.length, doctors });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getDoctorById = async (req, res) => {
  try {
    const { id } = req.params;
    if (mongoose.connection.readyState === 1 && mongoose.Types.ObjectId.isValid(id)) {
      const doc = await Doctor.findById(id);
      if (doc) return res.json({ success: true, doctor: doc });
    }
    const doc = localStore.getDoctorById(id);
    if (!doc) return res.status(404).json({ success: false, message: 'Doctor profile not found' });
    return res.json({ success: true, doctor: doc });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
