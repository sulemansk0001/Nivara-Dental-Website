import { localStore } from '../data/localStore.js';
import { Appointment } from '../models/Appointment.js';
import mongoose from 'mongoose';

// Validation helper
const validatePhone = (phone) => {
  const cleaned = phone.replace(/[\s\-\(\)]/g, '');
  return /^(\+91|91|0)?[6-9]\d{9}$/.test(cleaned);
};

const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const createAppointment = async (req, res) => {
  try {
    const {
      patientName,
      phone,
      email,
      doctor,
      treatment,
      appointmentDate,
      appointmentTime,
      additionalNotes
    } = req.body;

    // Server-side validation
    if (!patientName || patientName.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid patient name (minimum 2 characters).'
      });
    }

    if (!phone || !validatePhone(phone)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid 10-digit Indian mobile number.'
      });
    }

    if (!email || !validateEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.'
      });
    }

    if (!treatment) {
      return res.status(400).json({
        success: false,
        message: 'Please select a required dental treatment or service.'
      });
    }

    if (!appointmentDate) {
      return res.status(400).json({
        success: false,
        message: 'Please select a preferred appointment date.'
      });
    }

    if (!appointmentTime) {
      return res.status(400).json({
        success: false,
        message: 'Please select a preferred appointment time slot.'
      });
    }

    const payload = {
      patientName: patientName.trim(),
      phone: phone.trim(),
      email: email.trim().toLowerCase(),
      doctor: doctor || 'Any Available Specialist',
      treatment,
      appointmentDate,
      appointmentTime,
      additionalNotes: additionalNotes ? additionalNotes.trim() : '',
      appointmentStatus: 'pending'
    };

    let savedAppointment;

    // If MongoDB is actively connected, persist to MongoDB
    if (mongoose.connection.readyState === 1) {
      const doc = new Appointment(payload);
      savedAppointment = await doc.save();
    } else {
      // Local fallback
      savedAppointment = localStore.createAppointment(payload);
    }

    return res.status(201).json({
      success: true,
      message: 'Your appointment request has been recorded successfully. Our clinic team will verify the schedule and contact you shortly for confirmation.',
      appointment: savedAppointment
    });
  } catch (error) {
    console.error('Error in createAppointment:', error);
    return res.status(500).json({
      success: false,
      message: 'An internal server error occurred while booking the appointment.',
      error: error.message
    });
  }
};

export const getAppointments = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const list = await Appointment.find().sort({ createdAt: -1 });
      return res.json({ success: true, count: list.length, appointments: list });
    }
    const list = localStore.getAppointments();
    return res.json({ success: true, count: list.length, appointments: list });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowed = ['pending', 'confirmed', 'completed', 'cancelled'];
    if (!allowed.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status value' });
    }

    if (mongoose.connection.readyState === 1) {
      const updated = await Appointment.findByIdAndUpdate(id, { appointmentStatus: status }, { new: true });
      if (!updated) return res.status(404).json({ success: false, message: 'Appointment not found' });
      return res.json({ success: true, appointment: updated });
    }

    const updated = localStore.updateAppointmentStatus(id, status);
    if (!updated) return res.status(404).json({ success: false, message: 'Appointment not found' });
    return res.json({ success: true, appointment: updated });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
