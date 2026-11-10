import { localStore } from '../data/localStore.js';
import { Enquiry } from '../models/Enquiry.js';
import mongoose from 'mongoose';

const validatePhone = (phone) => {
  const cleaned = phone.replace(/[\s\-\(\)]/g, '');
  return /^(\+91|91|0)?[6-9]\d{9}$/.test(cleaned);
};

const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const createEnquiry = async (req, res) => {
  try {
    const {
      patientName,
      name,
      phone,
      email,
      requestedService,
      service,
      preferredDate,
      preferredTime,
      message
    } = req.body;

    const resolvedName = (patientName || name || '').trim();
    const resolvedService = (requestedService || service || 'General Consultation').trim();

    if (!resolvedName || resolvedName.length < 2) {
      return res.status(400).json({
        success: false,
        message: 'Please provide your full name (minimum 2 characters).'
      });
    }

    if (!phone || !validatePhone(phone)) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid 10-digit Indian mobile number.'
      });
    }

    if (!email || !validateEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid email address.'
      });
    }

    if (!message || message.trim().length < 5) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a brief message or question regarding your enquiry.'
      });
    }

    const payload = {
      patientName: resolvedName,
      phone: phone.trim(),
      email: email.trim().toLowerCase(),
      requestedService: resolvedService,
      preferredDate: preferredDate || '',
      preferredTime: preferredTime || '',
      message: message.trim(),
      enquiryStatus: 'new'
    };

    let savedEnquiry;
    if (mongoose.connection.readyState === 1) {
      const doc = new Enquiry(payload);
      savedEnquiry = await doc.save();
    } else {
      savedEnquiry = localStore.createEnquiry(payload);
    }

    return res.status(201).json({
      success: true,
      message: 'Thank you for reaching out to Nivara Dental Studio! We have received your enquiry and our front-desk coordinator will reply within business hours.',
      enquiry: savedEnquiry
    });
  } catch (error) {
    console.error('Error in createEnquiry:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while submitting enquiry.',
      error: error.message
    });
  }
};

export const getEnquiries = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const list = await Enquiry.find().sort({ createdAt: -1 });
      return res.json({ success: true, count: list.length, enquiries: list });
    }
    const list = localStore.getEnquiries();
    return res.json({ success: true, count: list.length, enquiries: list });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateEnquiryStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowed = ['new', 'contacted', 'resolved'];
    if (!allowed.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status value' });
    }

    if (mongoose.connection.readyState === 1) {
      const updated = await Enquiry.findByIdAndUpdate(id, { enquiryStatus: status }, { new: true });
      if (!updated) return res.status(404).json({ success: false, message: 'Enquiry not found' });
      return res.json({ success: true, enquiry: updated });
    }

    const updated = localStore.updateEnquiryStatus(id, status);
    if (!updated) return res.status(404).json({ success: false, message: 'Enquiry not found' });
    return res.json({ success: true, enquiry: updated });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
