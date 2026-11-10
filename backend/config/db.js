import mongoose from 'mongoose';

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri || uri.trim() === '') {
    console.log('ℹ️ MONGODB_URI not provided. Running in high-reliability LocalStore / In-Memory mode.');
    return false;
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`✅ MongoDB Connected successfully: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.warn(`⚠️ MongoDB connection attempt failed (${error.message}). Falling back seamlessly to local persistent store.`);
    return false;
  }
};
