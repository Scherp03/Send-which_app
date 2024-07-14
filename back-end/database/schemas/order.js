import mongoose from 'mongoose';
import Sandwich from './sandwich.js';

// Order schema
const orderSchema = new mongoose.Schema({
  userID: mongoose.Schema.Types.ObjectId,
  content: mongoose.Schema.Types.ObjectId,
  slot: Number,
  total: Number,
  status: String,
  date: Date,
});

// === METHODS === //

// Get price based on the prices of the sandwiches
orderSchema.methods.calculatePrice = async function () {
  let sandwich = await Sandwich.findById(this.content);
  if (sandwich) {
    this.total = await sandwich.calculatePrice();
  } else {
    console.log(
      'Error in calculatePrice: Sandwich not found for ID ' + this.content,
    );
  }
  await this.save();
  return this.total;
};

// Add statistics for all sandwiches in the order
orderSchema.methods.addOrderStatistics = async function () {
  let sandwich = await Sandwich.findById(this.content);
  if (sandwich) {
    sandwich.addStatistic();
  } else {
    console.log(
      'Error in addOrderStatistics: Sandwich not found for ID ' + this.content,
    );
    return false;
  }
  return true;
};

// Export the models
const Order = mongoose.model('Order', orderSchema);
export default Order;
