// src/lib/mongoose.ts
import mongoose from 'mongoose';

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return; // If already connected, exit the function
  }

  try {
    // Connect to the MongoDB database using the URI
    await mongoose.connect(process.env.MONGODB_URI!)
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw new Error('Could not connect to MongoDB');
  }
};

export default connectDB;
