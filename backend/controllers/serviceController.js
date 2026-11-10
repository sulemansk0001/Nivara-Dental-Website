import { localStore } from '../data/localStore.js';
import { Service } from '../models/Service.js';
import mongoose from 'mongoose';

export const getServices = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const services = await Service.find({ status: 'active' });
      if (services && services.length > 0) {
        return res.json({ success: true, count: services.length, services });
      }
    }
    const services = localStore.getServices();
    return res.json({ success: true, count: services.length, services });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getServiceBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    if (mongoose.connection.readyState === 1) {
      const srv = await Service.findOne({ slug, status: 'active' });
      if (srv) return res.json({ success: true, service: srv });
    }
    const srv = localStore.getServiceBySlug(slug);
    if (!srv) return res.status(404).json({ success: false, message: 'Dental service not found' });
    return res.json({ success: true, service: srv });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
