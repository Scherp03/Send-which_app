import Ingredient from '../database/schemas/ingredient.js';
import Sandwich from '../database/schemas/sandwich.js';

// calculateSandwichPrice
// Calculate the price of a sandwich given its _id
// Parameters required: _id
export const calculateSandwichPrice = async (req, res, next) => {
  res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
  try {
    let foundSandwich = await Sandwich.findById(req.body._id);
    if (foundSandwich) {
      let price = await foundSandwich.calculatePrice();
      return res.status(200).json({ success: true, price: price });
    } else {
      return res
        .status(404)
        .json({ success: false, message: 'Sandwich not found' });
    }
  } catch (err) {
    console.log(err.message);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// findBestSeller
// Parameters: none
export const findBestSeller = async (req, res, next) => {
  res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
  try {
    let bestSeller = await Sandwich.findBestSeller(1);
    return res.status(200).json({ success: true, bestSeller: bestSeller });
  } catch (err) {
    console.log(err.message);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
