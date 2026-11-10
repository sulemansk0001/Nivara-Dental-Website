import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  initialDoctors,
  initialServices,
  initialCaseStudies,
  initialTestimonials,
  initialBlogs,
  initialPricing
} from './seedData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, 'store.json');

class LocalStore {
  constructor() {
    this.data = {
      appointments: [
        {
          id: "apt-101",
          patientName: "Aditya Deshpande",
          phone: "+91 98230 11223",
          email: "aditya.d@example.com",
          doctor: "Dr. Priya Deshmukh",
          treatment: "General Dentistry",
          appointmentDate: "2026-11-15",
          appointmentTime: "11:30 AM",
          additionalNotes: "Experiencing mild cold sensitivity on upper left molar.",
          appointmentStatus: "confirmed",
          createdAt: new Date().toISOString()
        },
        {
          id: "apt-102",
          patientName: "Meera Kulkarni",
          phone: "+91 97654 44321",
          email: "meera.k@example.com",
          doctor: "Dr. Sneha Kulkarni",
          treatment: "Orthodontics & Braces",
          appointmentDate: "2026-11-16",
          appointmentTime: "04:00 PM",
          additionalNotes: "Consultation for invisible clear aligners.",
          appointmentStatus: "pending",
          createdAt: new Date().toISOString()
        }
      ],
      enquiries: [
        {
          id: "enq-201",
          patientName: "Pooja Shinde",
          phone: "+91 98901 88776",
          email: "pooja.shinde@example.com",
          requestedService: "Cosmetic Dentistry",
          preferredDate: "2026-11-18",
          preferredTime: "Morning",
          message: "Interested in teeth whitening and composite veneers before my sister's wedding.",
          submissionDate: new Date().toISOString(),
          enquiryStatus: "new"
        }
      ],
      doctors: initialDoctors,
      services: initialServices,
      caseStudies: initialCaseStudies,
      testimonials: initialTestimonials,
      blogs: initialBlogs,
      pricing: initialPricing
    };

    this.init();
  }

  init() {
    try {
      if (fs.existsSync(DATA_FILE)) {
        const fileContent = fs.readFileSync(DATA_FILE, 'utf8');
        const parsed = JSON.parse(fileContent);
        this.data = { ...this.data, ...parsed };
      } else {
        this.persist();
      }
    } catch (err) {
      console.warn("LocalStore init warning, using memory fallback:", err.message);
    }
  }

  persist() {
    try {
      fs.writeFileSync(DATA_FILE, JSON.stringify(this.data, null, 2), 'utf8');
    } catch (err) {
      console.error("LocalStore persist error:", err.message);
    }
  }

  // APPOINTMENTS
  getAppointments() {
    return this.data.appointments;
  }

  getAppointmentById(id) {
    return this.data.appointments.find(a => a.id === id);
  }

  createAppointment(payload) {
    const newApt = {
      id: `apt-${Date.now()}`,
      patientName: payload.patientName || "",
      phone: payload.phone || "",
      email: payload.email || "",
      doctor: payload.doctor || "Any Available Specialist",
      treatment: payload.treatment || "General Consultation",
      appointmentDate: payload.appointmentDate || "",
      appointmentTime: payload.appointmentTime || "",
      additionalNotes: payload.additionalNotes || "",
      appointmentStatus: "pending",
      createdAt: new Date().toISOString()
    };
    this.data.appointments.unshift(newApt);
    this.persist();
    return newApt;
  }

  updateAppointmentStatus(id, status) {
    const apt = this.data.appointments.find(a => a.id === id);
    if (apt) {
      apt.appointmentStatus = status;
      this.persist();
      return apt;
    }
    return null;
  }

  // ENQUIRIES
  getEnquiries() {
    return this.data.enquiries;
  }

  createEnquiry(payload) {
    const newEnq = {
      id: `enq-${Date.now()}`,
      patientName: payload.patientName || payload.name || "",
      phone: payload.phone || "",
      email: payload.email || "",
      requestedService: payload.requestedService || payload.service || "General Enquiry",
      preferredDate: payload.preferredDate || "",
      preferredTime: payload.preferredTime || "",
      message: payload.message || "",
      submissionDate: new Date().toISOString(),
      enquiryStatus: "new"
    };
    this.data.enquiries.unshift(newEnq);
    this.persist();
    return newEnq;
  }

  updateEnquiryStatus(id, status) {
    const enq = this.data.enquiries.find(e => e.id === id);
    if (enq) {
      enq.enquiryStatus = status;
      this.persist();
      return enq;
    }
    return null;
  }

  // DOCTORS
  getDoctors() {
    return this.data.doctors;
  }

  getDoctorById(id) {
    return this.data.doctors.find(d => d.id === id || d._id === id);
  }

  // SERVICES
  getServices() {
    return this.data.services;
  }

  getServiceBySlug(slug) {
    return this.data.services.find(s => s.slug === slug);
  }

  // BLOGS
  getBlogs() {
    return this.data.blogs;
  }

  getBlogBySlug(slug) {
    return this.data.blogs.find(b => b.slug === slug);
  }

  // CASE STUDIES & TESTIMONIALS
  getCaseStudies() {
    return this.data.caseStudies;
  }

  getCaseStudyById(id) {
    return this.data.caseStudies.find(c => c.id === id);
  }

  getTestimonials() {
    return this.data.testimonials;
  }

  getPricing() {
    return this.data.pricing;
  }

  // ADMIN STATS
  getStats() {
    const totalAppointments = this.data.appointments.length;
    const pendingAppointments = this.data.appointments.filter(a => a.appointmentStatus === 'pending').length;
    const confirmedAppointments = this.data.appointments.filter(a => a.appointmentStatus === 'confirmed').length;
    const completedAppointments = this.data.appointments.filter(a => a.appointmentStatus === 'completed').length;
    const totalEnquiries = this.data.enquiries.length;
    const newEnquiries = this.data.enquiries.filter(e => e.enquiryStatus === 'new').length;

    return {
      totalAppointments,
      pendingAppointments,
      confirmedAppointments,
      completedAppointments,
      totalEnquiries,
      newEnquiries,
      totalDoctors: this.data.doctors.length,
      totalServices: this.data.services.length,
      totalBlogs: this.data.blogs.length
    };
  }
}

export const localStore = new LocalStore();
