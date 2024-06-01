import mongoose from 'mongoose';
import Ingredient from './ingredient.js';

// Orders is the class with a list of orders
const sandwichSchema = new mongoose.Schema({
    breadType: String,
    ingredientsID: [mongoose.Schema.Types.ObjectId],
    price: Number,
});

// === METHODS === //

// Generate a hash for the ingredients
sandwichSchema.methods.getHash = async function () {
    let hash = '_';
    try {
        // Sort ingredientsID array by the string representation of their _id field;
        // This is eventually the same as sorting the ingredients by name, it is univocous
        this.ingredientsID.sort((a, b) =>
            a.toString().localeCompare(b.toString()),
        );

        for (let i = 0; i < this.ingredientsID.length; i++) {
            let ingredientFound = await Ingredient.findById(
                this.ingredientsID[i],
            );
            if (ingredientFound) {
                hash += ingredientFound.name.substring(0, 3);
                hash += ingredientFound._id.toString().substring(21, 25);
            } else {
                throw new Error(
                    `Ingredient with ID ${this.ingredientsID[i]} not found`,
                );
            }
        }
    } catch (error) {
        console.log('Error in ingredientsHash: ' + error);
    }
    return hash;
};

// Methods for the sandwichSchema
sandwichSchema.methods.printPrice = function () {
    console.log(`The price of the sandwich is ${this.price}`);
};

// Search for a sandwich by bread (case insensitive)
sandwichSchema.statics.findByBreadInsensitive = function (queryBread) {
    return this.where({ bread: new RegExp(queryName, 'i') });
};

// === VIRTUALS === //
sandwichSchema.virtual('ingredientsHash').get(function () {});

// === MIDDLEWARE === //

// Add one to list of stats when saving
sandwichSchema.pre('save', function (next) {
    this.hash = this.getHash();
    next();
});

// Export the models
const Sandwich = mongoose.model('Sandwich', sandwichSchema);
export default Sandwich;
