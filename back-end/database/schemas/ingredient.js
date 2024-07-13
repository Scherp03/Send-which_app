import mongoose from 'mongoose';

// Ingredient schema
const ingredientSchema = new mongoose.Schema({
  name: {
    type: String,
    min: 3,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  tags: [String],
  active: {
    type: Boolean,
    default: true,
  },
});
// ==== METHODS ==== //

// Add or remove a quantity of an ingredient in a safe way
// Check the input;
// If the quantity is negative, set it to 0;
ingredientSchema.methods.increaseAvailability = function (amount) {
  if (typeof amount !== 'number' || isNaN(amount)) {
    // console.log('Provided quantity is not a valid number: ' + amount);
    return false;
  }
  if (this.quantity + amount < 0) {
    // console.log('Ran out of (expected) ingredients: ' + this.name);
    this.quantity = 0;
    return true;
  }
  this.quantity += amount;
  // console.log('Availability changed: ' + this.name + ': ' + this.quantity);
  return true;
};

ingredientSchema.methods.setAvailability = function (newAvailability) {
  if (typeof newAvailability !== 'number' || isNaN(newAvailability)) {
    // console.log('Provided quantity is not a valid number: ' + newAvailability);
    return false;
  }
  if (newAvailability < 0) {
    // console.log('Negative quantity: ' + newAvailability);
    return false;
  }
  this.quantity = newAvailability;
  return true;
};

// Safe delete an ingredient: do not actually delete it, just set parameters
// This way information can be retrieved from the past
ingredientSchema.methods.safeDelete = async function () {
  // Fail if already deleted;
  if (this.active == false) {
    // console.log('Ingredient ' + this.name + ' found, but already deleted');
    return false;
  }
  // Ok otherwise; set quantity to 0 and set active to false
  this.active = false;
  this.quantity = 0;
  await this.save();
  // console.log('Ingredient deleted: ' + this.name);
  return true;
};

// Restore a "deleted" ingredient
ingredientSchema.statics.restoreDeleted = async function (restoredName) {
  // Find one, case insensitive
  let ingredient = await this.findOne({
    name: { $regex: new RegExp(restoredName, 'i') },
  });
  // Fail if ingredient not found
  if (!ingredient) {
    console.log('Failed to activate: Ingredient not found: ' + restoredName);
    return false;
  }
  // Fail if ingredient is already active
  if (ingredient.active == true) {
    console.log(
      'Failed to activate: ingredient already active: ' + restoredName,
    );
    return false;
  }
  // Otherwise, restore the ingredient
  ingredient.active = true;
  await ingredient.save();
  return true;
};

// Insert one ingredient only if certain parameters are met
// EQUIVALENT FUNCTION IN OTHER 'ingredient.js'

ingredientSchema.statics.addOneSafe = async function (
  name,
  description,
  price,
  quantity,
  tags,
) {
  // Test that it is not a duplicate
  let duplicateIngredient = await this.findOne({ name: name });
  if (duplicateIngredient) {
    // console.log('Duplicate ingredient: ' + name + ' ID: ' + duplicateIngredient._id  );
    return false;
  }
  // Test that the name is long enough
  if (name.length < 3) {
    // console.log('Name too short: ' + name);
    return false;
  }
  // Test that the quantity and price are a number
  if (typeof price !== 'number' || isNaN(price)) {
    // console.log('Price is not a valid number: ' + price);
    return false;
  }
  if (typeof quantity !== 'number' || isNaN(quantity)) {
    // console.log('Quantity is not a valid number: ' + quantity);
    return false;
  }
  if (!Number.isInteger(quantity)) {
    // console.log('Invalid quantity, not an integer: ' + quantity);
    return false;
  } else if (quantity < 0 || price < 0) {
    // console.log('Invalid quantity or price (negative): ' + quantity + ', ' + price );
    return false;
  }

  await this.create({
    name: name,
    description: description,
    price: price,
    quantity: quantity,
    tags: tags,
  });
  // console.log('Ingredient added: ' + name);
  return true;
};

// Export the models
const Ingredient = mongoose.model('Ingredient', ingredientSchema);
export default Ingredient;