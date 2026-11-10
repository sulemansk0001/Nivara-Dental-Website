import { localStore } from '../data/localStore.js';
import { Blog } from '../models/Blog.js';
import mongoose from 'mongoose';

export const getBlogs = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const blogs = await Blog.find().sort({ createdAt: -1 });
      if (blogs && blogs.length > 0) {
        return res.json({ success: true, count: blogs.length, blogs });
      }
    }
    const blogs = localStore.getBlogs();
    return res.json({ success: true, count: blogs.length, blogs });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getBlogBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    if (mongoose.connection.readyState === 1) {
      const blog = await Blog.findOne({ slug });
      if (blog) return res.json({ success: true, blog });
    }
    const blog = localStore.getBlogBySlug(slug);
    if (!blog) return res.status(404).json({ success: false, message: 'Article not found' });
    return res.json({ success: true, blog });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
