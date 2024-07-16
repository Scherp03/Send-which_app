import SandwichModel from '../database/schemas/sandwich.js';
import dotenv from 'dotenv';
dotenv.config();

export const createSandwich = async (req, res, next) => {
  res.set('Access-Control-Allow-Origin', `${process.env.CLIENT_BASE_URL}`);
  try {
    if (!req.body.breadType || !req.body.ingredientsID) {
      return res
        .status(400)
        .json({ success: false, message: `Something is missing` });
    }

    let newSandwich = new SandwichModel({
      breadType: req.body.breadType,
      ingredientsID: req.body.ingredientsID,
    });
    // calculate and add price
    await newSandwich.calculatePrice();

    // Check the sandwich existance with hashing
    let hash = await newSandwich.getHash();
    let duplicateSandwich = await SandwichModel.findOne({ hash: hash });

    if (
      duplicateSandwich &&
      newSandwich.breadType === duplicateSandwich.breadtype
    ) {
      await duplicateSandwich.calculatePrice();
      return res.status(201).json({
        // Changed to 201: created
        success: true,
        sandwichID: duplicateSandwich._id,
        sandwichIngredientsID: duplicateSandwich.ingredientsID,
        sandwichPrice: newSandwich.price,
        sandwichBread: duplicateSandwich.breadType,
      });
    }
    // else:

    // let hash = await newSandwich.getHash();

    // if (/* already exist */) {
    //   return res.status(200).json({
    //     success: true,
    //     sandwichID: ,
    //     sandwichIngredientsID: ,
    //     sandwichPrice: ,
    //   });
    // }

    // If new, create it
    const sandwichCreated = await SandwichModel.create(newSandwich);
    if (!sandwichCreated) {
      return res.status(503).json({
        success: false,
        message: `Something went wrong while creating the sandwich`,
      });
    }
    return res.status(200).json({
      success: true,
      sandwichID: sandwichCreated._id,
      sandwichIngredientsID: sandwichCreated.ingredientsID,
      sandwichPrice: sandwichCreated.price,
      sandwichBread: sandwichCreated.breadType,
    });
  } catch (err) {
    console.log(err.message);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const getSandwich = async (req, res, next) => {
  res.set('Access-Control-Allow-Origin', `${process.env.CLIENT_BASE_URL}`);
  try {
    const { id } = req.params;
    const sandwich = await SandwichModel.findById(id);
    if (!sandwich) {
      return res
        .status(404)
        .json({ success: false, message: `Sandwich fetch failed` });
    }
    return res.status(200).json({
      success: true,
      sandwichId: sandwich._id,
      sandwichIngredientsId: sandwich.ingredientsID,
      sandwichPrice: sandwich.price,
      sandwichBreadType: sandwich.breadType,
    });
  } catch (err) {
    console.log(err.message);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const getAllSandwiches = async (req, res, next) => {
  res.set('Access-Control-Allow-Origin', `${process.env.CLIENT_BASE_URL}`);
  try {
    // Fetch all sandwiches from the database
    const sandwiches = await SandwichModel.find({});
    if (!sandwiches) {
      return res.status(404).json({
        success: false,
        message: 'No sandwich was found in the database',
      });
    }
    return res.status(200).json({
      success: true,
      sandwiches: sandwiches,
    });
  } catch (err) {
    console.log(err.message);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
