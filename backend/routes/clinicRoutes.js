import express from 'express';
import { localStore } from '../data/localStore.js';

const router = express.Router();

router.get('/case-studies', (req, res) => {
  res.json({ success: true, caseStudies: localStore.getCaseStudies() });
});

router.get('/case-studies/:id', (req, res) => {
  const item = localStore.getCaseStudyById(req.params.id);
  if (!item) return res.status(404).json({ success: false, message: 'Case study not found' });
  res.json({ success: true, caseStudy: item });
});

router.get('/testimonials', (req, res) => {
  res.json({ success: true, testimonials: localStore.getTestimonials() });
});

router.get('/pricing', (req, res) => {
  res.json({ success: true, pricing: localStore.getPricing() });
});

router.get('/info', (req, res) => {
  res.json({
    success: true,
    clinic: {
      name: "Nivara Dental Studio",
      tagline: "Your Smile. Our Commitment.",
      address: "Shop No. 12, Apex Plaza, Airport Road, Pune, Maharashtra – 411015",
      phone: "+91 98765 43210",
      whatsapp: "+91 98765 43210",
      email: "hello@nivaradental.in",
      hours: {
        weekday: "Monday – Saturday: 10:00 AM – 8:00 PM",
        sunday: "Sunday: By Appointment"
      },
      coordinates: { lat: 18.5714, lng: 73.8762 }
    }
  });
});

export default router;
