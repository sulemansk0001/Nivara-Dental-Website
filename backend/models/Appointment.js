import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema(
  {
    patientName: {
      type: String,
      required: [true, 'Patient name is required'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email address is required'],
      trim: true,
      lowercase: true,
    },
    doctor: {
      type: String,
      default: 'Any Available Specialist',
    },
    treatment: {
      type: String,
      required: [true, 'Treatment selection is required'],
    },
    appointmentDate: {
      type: String,
      required: [true, 'Appointment date is required'],
    },
    appointmentTime: {
      type: String,
      required: [true, 'Appointment time is required'],
    },
    additionalNotes: {
      type: String,
      default: '',
    },
    appointmentStatus: {
      type: String,
      enum: ['pending', 'confirmed', 'completed', 'cancelled'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

export const Appointment = mongoose.model('Appointment', appointmentSchema);
