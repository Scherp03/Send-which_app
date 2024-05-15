const mongoose = require("mongoose")

// Orders is the class with a list of orders
const sandwichSchema = new mongoose.Schema({
    breadType: String,
    ingredientsID: [mongoose.Schema.Types.ObjectId],
    price: Number
})

// Methods for the sandwichSchema
sandwichSchema.methods.printPrice = function() {
    console.log(`The price of the sandwich is ${this.price}`);
}

// Search for a sandwich by bread (case insensitive)
sandwichSchema.statics.findByBreadInsensitive = function(queryBread) {
    return this.where({ bread: new RegExp(queryName, 'i') });
}

// Export the models
module.exports = sandwichSchema;
