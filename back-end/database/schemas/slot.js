import mongoose from 'mongoose';

// Slot schema
const slotSchema = new mongoose.Schema({
  time: Date,
  maxSandwiches: number,
  duration: number,
});

export default slotSchema;
