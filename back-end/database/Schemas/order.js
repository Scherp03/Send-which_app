import mongoose from 'mongoose'

// Order schema
const orderSchema = new mongoose.Schema({
    orderID: String,
    userID: String,
    slotID: String,
    content: [sandwichSchema],
    total: Number,
    status: String,
    date: Date
})  

// Add here the methods, like calculate price

// Export the models
export default orderSchema;