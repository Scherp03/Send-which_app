import mongoose from 'mongoose';
import express from 'express';

const uri = "mongodb+srv://WritingPurposeUser:FpKwCBXmZh7uSvfA@test1.sdy9unk.mongodb.net/?retryWrites=true&w=majority&appName=Test1";
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

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
univocousTest();


// === TEST FUNCTIONS === //

// Function to test the safe add functions;
async function univocousTest(){
  // Add ingredients
  try{
    await Ingredient.addOneSafe('Lettuce', 'Fresh green lettuce', 0.5, 100, ['vegetable', 'vegan']);
    await Ingredient.addOneSafe('Tomato', 'Juicy red tomato', 0.7, 100, ['vegetable', 'vegan']);
  } catch (err) {
    console.error('Error adding ingredients: ', err.message);
  }
  let ingredient = await Ingredient.findOne({ name: 'Lettuce' });
  ingredient.safeDelete();
  Ingredient.restoreDeleted('lettuce');
  ingredient.changeAvailability(50);
}

// Function to add a base set of data to the database
// Include slots, ingredients, sandwiches, users, orders and statistics
async function populateTest(){
  // Test slot
  const slot1 = new Slot({
      time: new Date()
    });

  // Test ingredient

  const ingredientsData = [
    new Ingredient({ name: 'Lettuce', description: 'Fresh green lettuce', price: 0.5, quantity: 100, tags: ['vegetable', 'vegan'] }),
    new Ingredient({ name: 'Tomato', description: 'Juicy red tomato', price: 0.7, quantity: 100, tags: ['vegetable', 'vegan'] }),
    new Ingredient({ name: 'Cheese', description: 'Creamy cheddar cheese', price: 1.5, quantity: 50, tags: ['dairy'] }),
    new Ingredient({ name: 'Ham', description: 'Sliced smoked ham', price: 2.0, quantity: 50, tags: ['meat'] }),
    new Ingredient({ name: 'Tuna', description: 'Canned tuna', price: 1.0, quantity: 100, tags: ['fish'] }),
  ];
  const ingredients = await Ingredient.insertMany(ingredientsData);


  // Test sandwich
  const sand1 = new Sandwich({
      breadType: 'Cereal',
      ingredientsID: [ingredientsData[0]._id, ingredientsData[1]._id, ingredientsData[2]._id],
      price: 6.99,
    }); 
  await sand1.save();

  // Test statistics for sandwiches
  const statsSandwich = [
    new StatSandwich({ ingredientsID: [ingredients[0]._id, ingredients[1]._id, ingredients[2]._id], timesSold: 10, ingredientsHash: '_' }),
    new StatSandwich({ ingredientsID: [ingredients[2]._id, ingredients[3]._id, ingredients[4]._id], timesSold: 15, ingredientsHash: '_'}),
    new StatSandwich({ ingredientsID: [ingredients[0]._id, ingredients[3]._id, ingredients[4]._id], timesSold: 8,  ingredientsHash: '_'}),
  ];

  // Test hash generation
  await statsSandwich[0].setHash();
  await statsSandwich[1].setHash();
  await statsSandwich[2].setHash(); 
  console.log("statsSandwich[0] hash: " + statsSandwich[0].ingredientsHash);

  await StatSandwich.insertMany(statsSandwich);


  // Test user
  const user1 = new User({
      firstName: 'John',
      lastName: 'Doe',
      username: "Jonneh",
      email: 'test@g.it',
      userName: 'johnSandwiches',
      password: '123ASD',
      sandwiches: [sand1.ObjectId],
    });
  await user1.save();
  console.log("User saved");
  // Test order
  const order1 = new Order({
      userID: user1.ObjectId,
      slotID: new mongoose.Types.ObjectId(),
      content: [sand1.ObjectId],
      total: 5.99,
      status: 'pending',
      date: new Date()
    });
  console.log("Order ID: " + order1.ObjectId);
  slot1.orderIDs.push(order1.ObjectId);
  await slot1.save();
  console.log("Slot saved");
  await order1.save();
  console.log("Order saved");
  }

// Test statistics
async function tryGetBest(){
  try{
    const best = await StatSandwich.findBestSeller(2);
    console.log('The two bestsellers are:', best);
  } catch (err) {
    console.error('Error getting bestseller:', err.message);
  }
}