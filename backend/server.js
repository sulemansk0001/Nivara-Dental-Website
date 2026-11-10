import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

import appointmentRoutes from './routes/appointmentRoutes.js';
import enquiryRoutes from './routes/enquiryRoutes.js';
import doctorRoutes from './routes/doctorRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import clinicRoutes from './routes/clinicRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security & Middlewares
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-admin-key']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    clinic: 'Nivara Dental Studio',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Mount Routes
app.use('/api/appointments', appointmentRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/clinic', clinicRoutes);
app.use('/api/admin', adminRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start Server
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 Nivara Dental Studio API Server running on port ${PORT}`);
    console.log(`📍 Endpoint: http://localhost:${PORT}/api/health`);
  });
};

startServer();
