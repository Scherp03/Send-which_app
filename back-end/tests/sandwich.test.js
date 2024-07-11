import mongoose from 'mongoose';
import Sandwich from '../database/schemas/sandwich';
import Ingredient from '../database/schemas/ingredient';
import StatSandwich from '../database/schemas/statisticSandwich';
import dotenv from 'dotenv';

dotenv.config();

const uri =
  'mongodb+srv://' +
  process.env.DB_CREDENTIALS +
  '@' +
  process.env.DB_HOST +
  '.' + // TO BE EVENTUALLY CHANGED WITH '/'
  process.env.DB_NAME +
  '?retryWrites=true&w=majority';
const clientOptions = {
  serverApi: { version: '1', strict: true, deprecationErrors: true },
};

// Function to have a database with some basic ingredients and a sandwich
async function populateDatabase() {
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
  return sandwich1._id;
}

// Function 1: addStatistic
test('addStatistic takes a sandwich and makes a statistic out of it', async () => {
  await mongoose.connect(uri, clientOptions);

  let sandwichID = await populateDatabase();
  let sandwich1 = await Sandwich.findOne({ _id: sandwichID });
  await sandwich1.addStatistic();
  let localHash = await sandwich1.getHash();
  let stat = await StatSandwich.findOne({
    ingredientsHash: localHash,
  });
  expect(stat.timesSold).toBe(1);
  await sandwich1.addStatistic();
  stat = await StatSandwich.findOne({
    ingredientsHash: localHash,
  });
  expect(stat.timesSold).toBe(2);
  await Ingredient.deleteMany({ name: 'UniqueIngredient' });
  await Sandwich.deleteOne({ _id: sandwichID });
  await mongoose.connection.close();
});

// Function 2: calculatePrice

test('calculatePrice calculates the price of a sandwich', async () => {
  await mongoose.connect(uri, clientOptions);

  let sandwichID = await populateDatabase();
  let sandwich1 = await Sandwich.findOne({ _id: sandwichID });
  expect(sandwich1.price).toBe(undefined);
  let price = await sandwich1.calculatePrice();
  expect(price).toBe(2 + 0.5 + 1);
  // Clear generated things
  await Ingredient.deleteMany({ tags: 'toBeDeleted' });
  await Sandwich.deleteOne({ _id: sandwichID });
  await mongoose.connection.close();
});

// Function 3: getHash

test('getHash generates a hash for the ingredients of a sandwich', async () => {
  await mongoose.connect(uri, clientOptions);

  let sandwichID = await populateDatabase();
  let sandwich1 = await Sandwich.findOne;

  await Sandwich.deleteOne({ _id: sandwichID });
  await Ingredient.deleteMany({ tags: 'toBeDeleted' });
  await mongoose.connection.close();
});
