import mongoose from 'mongoose';

// Ingredient schema
const ingredientSchema = new mongoose.Schema({
  name: {
    type: String,
    min: 3,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  tags: [String],
  active: {
    type: Boolean,
    default: true,
  },
});

// Export the models
const Order = mongoose.model('Ingredient', ingredientSchema);
export default Order;
