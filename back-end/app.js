import mongoose from 'mongoose';
import express from 'express';

const uri = "mongodb+srv://WritingPurposeUser:FpKwCBXmZh7uSvfA@test1.sdy9unk.mongodb.net/?retryWrites=true&w=majority&appName=Test1";
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

// IMPORT MODELS
import Order from './database/Schemas/order.js';
import Sandwich from './database/schemas/sandwich.js';
import User from './database/schemas/user.js';
import Ingredient from './database/schemas/ingredient.js';
import Slot from './database/schemas/slot.js';
import StatSandwich from './database/schemas/statisticSandwich.js';


mongoose.connect(uri, clientOptions);

populateTest();


// Function to add a base set of data to the database
async function populateTest(){
  // Test slot
  const slot1 = new Slot({
      time: new Date()
    });
  // Test ingredient
  const ing1 = new Ingredient({
      userID: new mongoose.Types.ObjectId(),
      slotID: new mongoose.Types.ObjectId(),
      name: 'Lettuce',
      description: 'A leafy green vegetable',
      price: 0.99,
      quantity: 100,
      tags: ['vegan', 'vegetarian', 'healthy']
    });
  ing1.save();
  console.log("Ingredient saved" + ing1);
  // Test sandwich
  const sand1 = new Sandwich({
      breadType: 'Cereal',
      ingredientsID: [new mongoose.Types.ObjectId(), ing1.ObjectId],
      price: 6.99,
    }); 
  sand1.save();
  console.log("Sandwich saved");
  // Test user
  const user1 = new User({
      firstName: 'John',
      lastName: 'Doe',
      email: 'test@g.it',
      userName: 'johnSandwiches',
      password: '123ASD',
      sandwiches: [sand1.ObjectId],
    });
  user1.save();
  console.log("User saved");
  // Test order
  const order1 = new Order({
      orderID: '123',
      userID: user1.ObjectId,
      slotID: '1',
      content: [sand1.ObjectId],
      total: 5.99,
      status: 'pending',
      date: new Date()
    });
  console.log("Order ID: " + order1.ObjectId);
  slot1.orderIDs.push(order1.ObjectId);
  slot1.save();
  console.log("Slot saved");
  order1.save();
  console.log("Order saved");
}