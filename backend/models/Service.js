import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema(
  {
    serviceName: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    tagline: { type: String },
    shortDescription: { type: String, required: true },
    indicativePrice: { type: String, required: true },
    image: { type: String, required: true },
    overview: { type: String, required: true },
    benefits: [{ type: String }],
    suitableFor: [{ type: String }],
    faqs: [
      {
        question: { type: String },
        answer: { type: String },
      },
    ],
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  },
  { timestamps: true }
);

export const Service = mongoose.model('Service', serviceSchema);
