import mongoose from 'mongoose';
import Ingredient from './ingredient.js';
import StatSandwich from './statisticSandwich.js';

const sandwichSchema = new mongoose.Schema({
  breadType: String,
  ingredientsID: [mongoose.Schema.Types.ObjectId],
  price: Number,
});

// === METHODS === //

// Search if there is a matching sandwich in the statistics;
// if so, increment the timesSold field;
// if not, create a new entry with timesSold = 1
sandwichSchema.methods.addStatistic = async function () {
  let localHash = await this.getHash();
  let foundStat = await StatSandwich.findOne({ ingredientsHash: localHash });
  if (foundStat) {
    foundStat.timesSold++;
    await foundStat.save();
  } else {
    let newStat = new StatSandwich({
      ingredientsID: this.ingredientsID,
      ingredientsHash: localHash,
      timesSold: 1,
    });
    await newStat.setHash();
    await newStat.save();
  }
};

// Calculate the price of the sandwich based on an arbitrary function
sandwichSchema.methods.calculatePrice = async function () {
  let price = 2; // Suppose there is a base price for bread
  try {
    for (let i = 0; i < this.ingredientsID.length; i++) {
      let ingredientFound = await Ingredient.findById(this.ingredientsID[i]);
      if (ingredientFound) {
        price += ingredientFound.price;
      } else {
        console.log(`Ingredient with ID ${this.ingredientsID[i]} not found`);
      }
    }
  } catch (error) {
    console.log('Error in calculatePrice: ' + error);
  }
  this.price = price;
  await this.save();
  return price;
};

// Generate a hash for the ingredients
sandwichSchema.methods.getHash = async function () {
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
        console.log(`Ingredient with ID ${this.ingredientsID[i]} not found`);
      }
    }
  } catch (error) {
    console.log('Error in ingredientsHash: ' + error);
  }
  return hash;
};

// Search for a sandwich by bread (case insensitive)
// Just a tiny exercise and reminder for myself, pointless but not worth deleting
sandwichSchema.statics.findByBreadInsensitive = function (queryBread) {
  return this.where({ bread: new RegExp(queryName, 'i') });
};

// Export the models
const Sandwich = mongoose.model('Sandwich', sandwichSchema);
export default Sandwich;
