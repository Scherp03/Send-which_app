import mongoose, { mongo } from "mongoose";

// Ingredient schema
const ingredientSchema = new mongoose.Schema({
  name: {
    type: String,
    min: 3,
  },
  description: String,
  price: Number,
  quantity: Number,
  tags: [String],
});

// Export the models
const Order = mongoose.model("Ingredient", ingredientSchema);
export default Order;
