import mongoose from 'mongoose';
import Ingredient from '../database/schemas/ingredient';
import Order from '../database/schemas/order';
import Sandwich from '../database/schemas/sandwich';
import StatSandwich from '../database/schemas/statisticSandwich';

beforeAll(async () => {
  const dbUri =
    'mongodb+srv://WritingPurposeUser:FpKwCBXmZh7uSvfA@test1.sdy9unk.mongodb.net/Test_Jest2?retryWrites=true&w=majority';
  await mongoose.connect(dbUri);
}, 20000);

afterAll(async () => {
  await Ingredient.deleteMany({ tags: 'toBeDeleted' });
  await mongoose.connection.close();
}, 20000);

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
    await sandwich1.save();
    let order1 = new Order({
      content: sandwich1._id,
      price: 0,
    });
    let realPrice = await order1.calculatePrice();
    let expectedPrice = 2 + 0.5 + 1;
    expect(realPrice).toBe(expectedPrice);

    await Sandwich.deleteOne({ _id: sandwich1._id });
    await Order.deleteOne({ _id: order1._id });
  });
});

// Function 2: addOrderStatistics
describe('Order', () => {
  test('addOrderStatistics adds statistics for all sandwiches in the order', async () => {
    // Add basic data
    let ingredient1 = await Ingredient.findOne({ name: 'Tomato' });
    let ingredient2 = await Ingredient.findOne({ name: 'Cheese' });
    let sandwich1 = new Sandwich({
      breadType: 'White',
      ingredientsID: [ingredient1._id, ingredient2._id],
    });
    await sandwich1.save();
    let order1 = new Order({
      content: sandwich1._id,
      price: 0,
    });

    let hash1 = await sandwich1.getHash();

    await sandwich1.addStatistic();
    expect(await order1.addOrderStatistics()).toBe(true);

    let stat1 = await StatSandwich.findOne({
      ingredientsHash: hash1,
    });

    expect(stat1.timesSold).toBe(1);
    await Sandwich.deleteOne({ _id: sandwich1._id });
    await StatSandwich.deleteOne({ ingredientsHash: hash1 });
  });
});
