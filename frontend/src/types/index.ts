export interface Doctor {
  id: string;
  _id?: string;
  name: string;
  qualification: string;
  specialisation: string;
  experience: string;
  regNo?: string;
  profileImage: string;
  description: string;
  daysAvailable: string[];
  consultationFee: string;
  languages?: string[];
  education?: string[];
  status?: string;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface Service {
  id: string;
  _id?: string;
  serviceName: string;
  slug: string;
  tagline?: string;
  shortDescription: string;
  indicativePrice: string;
  image: string;
  overview: string;
  benefits: string[];
  suitableFor: string[];
  faqs?: ServiceFAQ[];
  status?: string;
}

export interface KeyMetric {
  label: string;
  value: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  treatment: string;
  doctor: string;
  duration: string;
  description: string;
  beforeImage: string;
  afterImage: string;
  keyMetrics: KeyMetric[];
  quote: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  treatment: string;
  avatar: string;
  review: string;
  date: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  author: string;
  readTime: string;
  publicationDate: string;
  featuredImage: string;
  excerpt: string;
  content: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  billing: string;
  popular: boolean;
  badge?: string;
  description: string;
  features: string[];
  ctaText: string;
  ctaLink: string;
}

export interface AppointmentFormData {
  patientName: string;
  phone: string;
  email: string;
  doctor: string;
  treatment: string;
  appointmentDate: string;
  appointmentTime: string;
  additionalNotes?: string;
}

export interface EnquiryFormData {
  patientName: string;
  phone: string;
  email: string;
  requestedService: string;
  preferredDate?: string;
  preferredTime?: string;
  message: string;
}

export interface AppointmentItem extends AppointmentFormData {
  id: string;
  _id?: string;
  appointmentStatus: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface EnquiryItem extends EnquiryFormData {
  id: string;
  _id?: string;
  enquiryStatus: 'new' | 'contacted' | 'resolved';
  submissionDate: string;
}
