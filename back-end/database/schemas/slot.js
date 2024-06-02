import mongoose, { mongo } from "mongoose";

// Slot schema
const slotSchema = new mongoose.Schema({
  orderIDs: [mongoose.Schema.Types.ObjectId],
  durationMinutes: {
    type: Number,
    default: 15,
  },
  time: Date,
  capacity: {
    type: Number,
    default: 5,
  },
});

// Export the models
const Slot = mongoose.model("Slot", slotSchema);
export default Slot;
