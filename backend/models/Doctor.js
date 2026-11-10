import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    qualification: { type: String, required: true },
    specialisation: { type: String, required: true },
    experience: { type: String, required: true },
    profileImage: { type: String, required: true },
    description: { type: String, required: true },
    daysAvailable: [{ type: String }],
    consultationFee: { type: String, default: '₹999' },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  },
  { timestamps: true }
);

export const Doctor = mongoose.model('Doctor', doctorSchema);
