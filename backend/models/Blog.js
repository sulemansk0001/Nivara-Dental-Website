import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    author: { type: String, required: true },
    readTime: { type: String, default: '4 min read' },
    publicationDate: { type: String },
    featuredImage: { type: String, required: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

export const Blog = mongoose.model('Blog', blogSchema);
