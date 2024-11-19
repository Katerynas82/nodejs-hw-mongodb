import mongoose from 'mongoose';
import { env } from '../utils/env.js';

const MONGODB_URI = `mongodb+srv://${env('MONGODB_USER')}:${env(
  'MONGODB_PASSWORD',
)}@${env('MONGODB_URL')}/${env('MONGODB_DB')}?retryWrites=true&w=majority`;

export const initMongoConnection = async () => {
    try {
  await mongoose.connect(MONGODB_URI);
  console.log('MongoDB connection established successfully!');
} catch (error) {
  console.error('Error connecting to MongoDB:', error.message);
  process.exit(1);
  }};
