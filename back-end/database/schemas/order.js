import mongoose from 'mongoose';

// Order schema
const orderSchema = new mongoose.Schema({
    userID: String,
    slotID: String,
    content: [mongoose.Schema.Types.ObjectId],
    total: Number,
    status: String,
    date: Date,
});

// Add here the methods, like calculate price

// Export the models
const Order = mongoose.model('Order', orderSchema);
export default Order;
