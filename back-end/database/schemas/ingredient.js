import mongoose, { mongo } from 'mongoose'

// Ingredient schema
const ingredientSchema = new mongoose.Schema({
    userID: mongoose.Schema.Types.ObjectId,
    slotID: mongoose.Schema.Types.ObjectId,
    name: String,
    description: String,
    price: Number,
    quantity: Number,
    tags: [String],
})  

// Export the models
const Order = mongoose.model('Ingredient', ingredientSchema);
export default Order;