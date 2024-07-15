import mongoose from 'mongoose';

// Slot schema
const slotSchema = new mongoose.Schema({
  time: Date,
  maxSandwiches: Number,
  duration: Number,
});
const Slot = mongoose.model('Slot', slotSchema);
export default Slot;
