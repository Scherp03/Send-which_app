import mongoose, { mongo } from 'mongoose';
import Ingredient from './ingredient.js';

// Sandwich schema with basic content used for statistics
const statSchema = new mongoose.Schema({
  ingredientsID: [mongoose.Schema.Types.ObjectId],
  ingredientsHash: String,
  timesSold: Number,
});

// === METHODS === //
// Get hash; equivalent to getHash in sandwich.js
statSchema.methods.setHash = async function () {
  let hash = '_';
  try {
    // Sort ingredientsID array by the string representation of their _id field;
    // This is eventually the same as sorting the ingredients by name, it is univocous
    this.ingredientsID.sort((a, b) => a.toString().localeCompare(b.toString()));

    for (let i = 0; i < this.ingredientsID.length; i++) {
      let ingredientFound = await Ingredient.findById(this.ingredientsID[i]);
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
  this.ingredientsHash = hash;
};

// Find bestseller
// Use n=1 for the actual bestseller, otherwise get a list

// TBD
statSchema.statics.findBestSeller = function (resultsNumber) {
  // return this.findOne().sort({timesSold: -1}).limit(resultsNumber);

  return this.where({}).sort({ timesSold: -1 }).limit(resultsNumber);
};

// Export the models
const statSandwich = mongoose.model('statSandwich', statSchema);
export default statSandwich;
