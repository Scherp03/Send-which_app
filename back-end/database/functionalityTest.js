import mongoose from 'mongoose';
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const uri =
  'mongodb+srv://' +
  process.env.DB_CREDENTIALS +
  '@' +
  process.env.DB_HOST +
  '.' + // TO BE EVENTUALLY CHANGED WITH '/'
  process.env.DB_NAME +
  '?retryWrites=true&w=majority&appName=Test1';
const clientOptions = {
  serverApi: { version: '1', strict: true, deprecationErrors: true },
};
mongoose.connect(uri, clientOptions);
const app = express();

// IMPORT MODELS
import Order from './schemas/order.js';
import Sandwich from './schemas/sandwich.js';
import User from './schemas/user.js';
import Ingredient from './schemas/ingredient.js';
import Slot from './schemas/slot.js';
import StatSandwich from './schemas/statisticSandwich.js';

// Database connection
mongoose.connect(uri, clientOptions);

// populateTest();
// populateStats();
// tryGetBest();
// await univocousTest();
// await safeTest();

await mongoose.connection.close();

// === TEST FUNCTIONS === //

// Function to test the functions in the tests:
async function safeTest() {
  const name = 'UniqueIngredient';
  const description = 'A unique ingredient';
  const price = 10;
  const quantity = 100;
  const tags = ['unique', 'toBeDeleted'];

  let result = await Ingredient.addOneSafe(
    name,
    description,
    price,
    quantity,
    tags,
  );
  let confirmation = await Ingredient.findOne({ name });

  console.log('Result: ', result);
  console.log('Confirmation: ', confirmation);

  confirmation = await confirmation.safeDelete();
  console.log('Confirmation after delete: ', confirmation);

  Ingredient.deleteMany({ name: 'UniqueIngredient' });
}

// Function to test the safe add functions;
async function univocousTest() {
  // Add ingredients
  try {
    await Ingredient.addOneSafe('Lettuce', 'Fresh green lettuce', 0.5, 100, [
      'vegetable',
      'vegan',
      'toBeDeleted',
    ]);
    await Ingredient.addOneSafe('Tomato', 'Juicy red tomato', 0.7, 100, [
      'vegetable',
      'vegan',
    ]);
  } catch (err) {
    console.error('Error adding ingredients: ', err.message);
  }
  let ingredient = await Ingredient.findOne({ name: 'Lettuce' });
  ingredient.safeDelete();
  Ingredient.restoreDeleted('lettuce');
  ingredient.setAvailability(50);
}

// Function to add a base set of data to the database
// Include slots, ingredients, sandwiches, users, orders and statistics
async function populateTest() {
  // Test slot
  const slot1 = new Slot({
    time: new Date(),
  });

  // Test ingredient

  Ingredient.addOneSafe('Lettuce', 'Fresh green lettuce', 0.5, 100, [
    'vegetable',
    'vegan',
  ]);
  Ingredient.addOneSafe('Tomato', 'Juicy red tomato', 0.7, 100, [
    'vegetable',
    'vegan',
  ]);
  Ingredient.addOneSafe('Cheese', 'Creamy cheddar cheese', 1.5, 50, ['dairy']);
  Ingredient.addOneSafe('Ham', 'Sliced smoked ham', 2.0, 50, ['meat']);
  Ingredient.addOneSafe('Tuna', 'Canned tuna', 1.0, 100, ['fish']);

  // Test sandwich
  let sand1 = await Sandwich.findOne({ breadType: 'Cereal' });
  if (!sand1) {
    sand1 = new Sandwich({
      breadType: 'Cereal',
      ingredientsID: [
        ingredientsData[0]._id,
        ingredientsData[1]._id,
        ingredientsData[2]._id,
      ],
      price: 6.99,
    });
    await sand1.save();
  }

  // // Test statistics for sandwiches
  // const statsSandwich = [
  //   new StatSandwich({ ingredientsID: [ingredients[0]._id, ingredients[1]._id, ingredients[2]._id], timesSold: 10, ingredientsHash: '_' }),
  //   new StatSandwich({ ingredientsID: [ingredients[2]._id, ingredients[3]._id, ingredients[4]._id], timesSold: 15, ingredientsHash: '_'}),
  //   new StatSandwich({ ingredientsID: [ingredients[0]._id, ingredients[3]._id, ingredients[4]._id], timesSold: 8,  ingredientsHash: '_'}),
  // ];

  // // Test hash generation
  // await statsSandwich[0].setHash();
  // await statsSandwich[1].setHash();
  // await statsSandwich[2].setHash();
  // console.log("statsSandwich[0] hash: " + statsSandwich[0].ingredientsHash);

  // await StatSandwich.insertMany(statsSandwich);

  // Test user
  let user1 = User.findOne({ firstName: 'John' });
  if (!user1) {
    user1 = new User({
      firstName: 'John',
      lastName: 'Doe',
      username: 'Jonneh',
      email: 'test@g.it',
      userName: 'johnSandwiches',
      password: '123ASD',
      sandwiches: [sand1.ObjectId],
    });
    await user1.save();
  }

  // Test order
  let order1 = new Order({
    userID: user1._id,
    slotID: new mongoose.Types.ObjectId(),
    content: [sand1.ObjectId],
    status: 'pending',
    date: new Date(),
  });
  order1 = await order1.save();
  order1.calculatePrice();
  order1.addOrderStatistics(); // problem here: Uncaught TypeError TypeError: sandwich.addStatistic is not a function
  console.log('Order ID: ' + order1._id);
  slot1.orderIDs.push(order1.ObjectId);
  await slot1.save();
  console.log('Slot saved');
  await order1.save();
  console.log('Order saved');
}

// Test statistics
async function tryGetBest() {
  try {
    const best = await StatSandwich.findBestSeller(2);
    console.log('The two bestsellers are:', best);
  } catch (err) {
    console.error('Error getting bestseller:', err.message);
  }
}
