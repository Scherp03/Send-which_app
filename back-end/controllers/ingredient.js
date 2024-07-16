import Ingredient from '../database/schemas/ingredient.js';

// addIngredient: Add a new ingredient to the database
// Insert one ingredients only if all parameters are met
export const addIngredient = async (req, res, next) => {
  res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
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
export const setAvailability = async (req, res, next) => {
  res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
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
    let foundIngredient = await Ingredient.findOne({ _id: req.body._id });
    if (!foundIngredient) {
      return res
        .status(404)
        .json({ success: false, message: 'Ingredient not found' });
    }
    foundIngredient.quantity = newAvailability;
    await foundIngredient.save();
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

// increaseAvailability
// Like the previous function, adds instead of setting
// Assures that only valid quantities are used
// Parameters needed: _id, availability
export const increaseAvailability = async (req, res, next) => {
  res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
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
    let foundIngredient = await Ingredient.findOne({ _id: req.body._id });
    if (!foundIngredient) {
      return res
        .status(404)
        .json({ success: false, message: 'Ingredient not found' });
    }
    // If it is valid, add the quantity
    foundIngredient.quantity += newAvailability;
    await foundIngredient.save();
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

// deleteIngredient
// Safe delete an ingredient given its _id
// Parameters required: _id
export const deleteIngredient = async (req, res, next) => {
  res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
  try {
    let foundIngredient = await Ingredient.findOne({ _id: req.body._id });
    if (!foundIngredient) {
      return res
        .status(404)
        .json({ success: false, message: 'Ingredient not found' });
    }
    if (await foundIngredient.safeDelete()) {
      return res
        .status(200)
        .json({ success: true, message: 'Ingredient deleted' });
    }
    return res
      .status(500)
      .json({ success: false, message: 'Failed to delete ingredient' });
  } catch (err) {
    console.log(err.message);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// restoreDeleted
// Restore a deleted ingredient given its name
export const restoreDeleted = async (req, res, next) => {
  res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
  try {
    let restoredName = req.body.name;
    let foundIngredient = await Ingredient.findOne({
      name: { $regex: new RegExp(restoredName, 'i') },
    });
    if (!foundIngredient) {
      return res
        .status(404)
        .json({ success: false, message: 'Ingredient not found' });
    }
    if (foundIngredient.active) {
      return res
        .status(400)
        .json({ success: false, message: 'Ingredient already active' });
    }
    foundIngredient.active = true;
    await foundIngredient.save();
    return res
      .status(200)
      .json({ success: true, message: 'Ingredient restored' });
  } catch (err) {
    console.log(err.message);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// export const getIngredientList = async (req, res, next) => {
//   res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
//   try {
//     let allIngredients = await Ingredient.find({ active: true });
//     if (!allIngredients) {
//       return res
//         .status(404)
//         .json({ success: false, message: 'No ingredients found' });
//     }
//     return res.status(200).json({ success: true, ingredients: allIngredients });
//   } catch (err) {
//     console.log(err.message);
//     if (!err.statusCode) {
//       err.statusCode = 500;
//     }
//     next(err);
//   }
// };

export const getIngredient = async (req, res, next) => {
  res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
  try {
    let foundIngredient = await Ingredient.findById(req.params.id);
    if (foundIngredient) {
      return res
        .status(200)
        .json({ success: true, ingredient: foundIngredient, name: foundIngredient.name });
    } else {
      return res
        .status(404)
        .json({ success: false, message: 'Ingredient not found' });
    }
  } catch (err) {
    console.log(err.message);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// getIngredients
// Delivers the whole list of ingreients
export const getIngredients = async (req, res, next) => {
  res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
  try {
    // find() gets all the documents
    let allIngredients = await Ingredient.find({ active: true });
    return res.status(200).json({ success: true, ingredients: allIngredients });
  } catch (err) {
    console.log(err.message);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
