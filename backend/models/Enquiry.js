import mongoose from 'mongoose';

const enquirySchema = new mongoose.Schema(
  {
    patientName: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
    },
    requestedService: {
      type: String,
      default: 'General Consultation',
    },
    preferredDate: {
      type: String,
      default: '',
    },
    preferredTime: {
      type: String,
      default: '',
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
    },
    enquiryStatus: {
      type: String,
      enum: ['new', 'contacted', 'resolved'],
      default: 'new',
    },
  },
  {
    timestamps: true,
  }
);

export const Enquiry = mongoose.model('Enquiry', enquirySchema);
