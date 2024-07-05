import Ingredient from '../database/schemas/ingredient.js';

// addIngredient: Add a new ingredient to the database
// Insert one ingredients only if all parameters are met
export const addIngredient = async (req, res) => {
  try {
    const newIngredient = new Ingredient({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      quantity: req.body.quantity,
      tags: req.body.tags,
    });
    // Requirements for successful addition:
    // Unique and long enough name;
    // Valid price and quantity;
    let duplicateIngredient = await Ingredient.findOne({
      name: newIngredient.name,
    });
    if (duplicateIngredient) {
      return res
        .status(400)
        .json({ success: false, message: 'Duplicate ingredient' });
    }
    if (newIngredient.name.length < 3) {
      return res
        .status(400)
        .json({ success: false, message: 'Name too short' });
    }
    if (typeof newIngredient.price !== 'number' || isNaN(newIngredient.price)) {
      return res
        .status(400)
        .json({ success: false, message: 'Price is not a valid number' });
    }
    if (
      typeof newIngredient.quantity !== 'number' ||
      isNaN(newIngredient.quantity)
    ) {
      return res
        .status(400)
        .json({ success: false, message: 'Quantity is not a valid number' });
    }
    // If all tests pass, add the ingredient
    await newIngredient.save();
    return res.status(201).json({ success: true, message: 'Ingredient added' });
  } catch (err) {
    console.log(err.message);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// setAvailability
// Set the availability of an ingredient given the _id
// Assures that only valid quantities are used
// Parameters required: _id, availability
export const setAvailability = async (req, res) => {
  try {
    // Test that the input is valid
    let newAvailability = req.body.availability;
    if (
      newAvailability < 0 ||
      typeof newAvailability !== 'number' ||
      isNaN(newAvailability)
    ) {
      return res
        .status(400)
        .json({ success: false, message: 'Quantity is not valid' });
    }
    // After these tests, suppose that the input is valid.
    // Find the ingredient and test it;
    let foundIngredient = Ingredient.findOne({ _id: req.body._id });
    if (!foundIngredient) {
      return res
        .status(404)
        .json({ success: false, message: 'Ingredient not found' });
    }
    foundIngredient.quantity = newAvailability;
    return res
      .status(200)
      .json({ success: true, message: 'Availability changed' });
  } catch (err) {
    console.log(err.message);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// increaseAvailability
// Like the previous function, adds instead of setting
// Assures that only valid quantities are used
// Parameters needed: _id, availability
export const increaseAvailability = async (req, res) => {
  try {
    // Test that the input is valid
    let newAvailability = req.body.availability;
    if (
      newAvailability < 0 ||
      typeof newAvailability !== 'number' ||
      isNaN(newAvailability)
    ) {
      return res
        .status(400)
        .json({ success: false, message: 'Quantity is not valid' });
    }
    let foundIngredient = Ingredient.findOne({ _id: req.body._id });
    if (!foundIngredient) {
      return res
        .status(404)
        .json({ success: false, message: 'Ingredient not found' });
    }
    foundIngredient.quantity = newAvailability;
    return res
      .status(200)
      .json({ success: true, message: 'Availability updated' });
  } catch (err) {
    console.log(err.message);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
