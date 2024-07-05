import mongoose from 'mongoose';
import Sandwich from './sandwich.js';

// Order schema
const orderSchema = new mongoose.Schema({
  userID: String,
  slotID: String,
  content: [mongoose.Schema.Types.ObjectId],
  total: Number,
  status: String,
  date: Date,
});

// === METHODS === //

// Get price based on the prices of the sandwiches
orderSchema.methods.calculatePrice = async function () {
  this.total = 0;
  for (let i = 0; i < this.content.length; i++) {
    let sandwich = await Sandwich.findById(this.content[i]);
    if (sandwich) {
      let temporaryPrice = await sandwich.calculatePrice();
      this.total += temporaryPrice;
    } else {
      console.log(
        'Error in calculatePrice: Sandwich not found for ID ' + this.content[i],
      );
      break;
    }
    return this.total;
  }
};

// Add statistics for all sandwiches in the order
orderSchema.methods.addOrderStatistics = async function () {
  for (let i = 0; i < this.content.length; i++) {
    let sandwich = await Sandwich.findById(this.content[i]);
    if (sandwich) {
      sandwich.addStatistic();
    } else {
      console.log(
        'Error in addOrderStatistics: Sandwich not found for ID ' +
          this.content[i],
      );
      break;
    }
  }
};

// Export the models
const Order = mongoose.model('Order', orderSchema);
export default Order;
