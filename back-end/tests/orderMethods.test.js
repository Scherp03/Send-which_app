import mongoose from 'mongoose';
import Ingredient from '../database/schemas/ingredient';
import Order from '../database/schemas/order';
import dotenv from 'dotenv';
import Sandwich from '../database/schemas/sandwich';
import StatSandwich from '../database/schemas/statisticSandwich';

dotenv.config();

const dbUri = process.env.DB_URI;
const clientOptions = {
  serverApi: { version: '1', strict: true, deprecationErrors: true },
};

beforeAll(async () => {
  await mongoose.connect(dbUri, clientOptions);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Order', () => {
  // Function 1: calculatePrice
  // Verify basic conditions: price is calculated correctly
  test('calculatePrice calculates the price of an order correctly', async () => {
    let ingredient1 = new Ingredient({
      name: 'Tomato',
      price: 0.5,
      quantity: 10,
      tags: ['vegetarian', 'vegan', 'toBeDeleted'],
    });
    let ingredient2 = new Ingredient({
      name: 'Cheese',
      price: 1,
      quantity: 20,
      tags: ['vegetarian', 'lactose', 'toBeDeleted'],
    });
    let ingredient3 = new Ingredient({
      name: 'Ham',
      price: 2,
      quantity: 50,
      tags: ['meat', 'toBeDeleted'],
    });
    await Ingredient.insertMany([ingredient1, ingredient2, ingredient3]);
    let sandwich1 = new Sandwich({
      breadType: 'White',
      ingredientsID: [ingredient1._id, ingredient2._id],
    });
    let sandwich2 = new Sandwich({
      breadType: 'Large',
      ingredientsID: [ingredient2._id, ingredient3._id],
    });
    await Sandwich.insertMany([sandwich1, sandwich2]);
    let order1 = new Order({
      content: [sandwich1._id, sandwich2._id],
      price: 0,
    });
    let realPrice = await order1.calculatePrice();
    let expectedPrice = 2 + 0.5 + 1 + 2 + 1 + 2;
    expect(realPrice).toBe(expectedPrice);

    await Ingredient.deleteMany({ tags: 'toBeDeleted' });
    await Sandwich.deleteMany({ _id: { $in: [sandwich1._id, sandwich2._id] } });
  });
});

// Function 2: addOrderStatistics
describe('Order', () => {
  test('addOrderStatistics adds statistics for all sandwiches in the order', async () => {
    // Add basic data
    let ingredient1 = new Ingredient({
      name: 'Tomato',
      price: 0.5,
      quantity: 10,
      tags: ['vegetarian', 'vegan', 'toBeDeleted'],
    });
    let ingredient2 = new Ingredient({
      name: 'Cheese',
      price: 1,
      quantity: 20,
      tags: ['vegetarian', 'lactose', 'toBeDeleted'],
    });
    let ingredient3 = new Ingredient({
      name: 'Ham',
      price: 2,
      quantity: 50,
      tags: ['meat', 'toBeDeleted'],
    });
    await Ingredient.insertMany([ingredient1, ingredient2, ingredient3]);
    let sandwich1 = new Sandwich({
      breadType: 'White',
      ingredientsID: [ingredient1._id, ingredient2._id],
    });
    let sandwich2 = new Sandwich({
      breadType: 'Large',
      ingredientsID: [ingredient2._id, ingredient3._id],
    });
    await Sandwich.insertMany([sandwich1, sandwich2]);
    let order1 = new Order({
      content: [sandwich1._id, sandwich2._id],
      price: 0,
    });

    let hash1 = await sandwich1.getHash();
    let hash2 = await sandwich2.getHash();

    await sandwich1.addStatistic();
    await sandwich2.addStatistic();
    expect(await order1.addOrderStatistics()).toBe(true);

    let stat1 = await StatSandwich.findOne({
      ingredientsHash: hash1,
    });
    let stat2 = await StatSandwich.findOne({
      ingredientsHash: hash2,
    });

    expect(stat1.timesSold).toBe(1);
    expect(stat2.timesSold).toBe(1);

    await Ingredient.deleteMany({ tags: 'toBeDeleted' });
    await Sandwich.deleteMany({ _id: { $in: [sandwich1._id, sandwich2._id] } });
    await StatSandwich.deleteMany({ ingredientsHash: { $in: [hash1, hash2] } });
  });
});
