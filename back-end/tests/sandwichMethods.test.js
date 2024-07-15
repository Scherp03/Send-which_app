import mongoose from 'mongoose';
import Sandwich from '../database/schemas/sandwich';
import Ingredient from '../database/schemas/ingredient';
import StatSandwich from '../database/schemas/statisticSandwich';

beforeAll(async () => {
  const dbUri =
    'mongodb+srv://WritingPurposeUser:FpKwCBXmZh7uSvfA@test1.sdy9unk.mongodb.net/Test_Jest2?retryWrites=true&w=majority';
  await mongoose.connect(dbUri);
  await populateDatabase();
}, 20000);

afterAll(async () => {
  await Ingredient.deleteMany({ tags: 'toBeDeleted1' });
  await mongoose.connection.close();
}, 20000);

// Function to have a database with some basic ingredients and a sandwich
async function populateDatabase() {
  let ingredient1 = new Ingredient({
    name: 'Tomato',
    price: 0.5,
    quantity: 10,
    tags: ['vegetarian', 'vegan', 'toBeDeleted1'],
  });
  let ingredient2 = new Ingredient({
    name: 'Cheese',
    price: 1,
    quantity: 20,
    tags: ['vegetarian', 'lactose', 'toBeDeleted1'],
  });
  let ingredient3 = new Ingredient({
    name: 'Ham',
    price: 2,
    quantity: 50,
    tags: ['meat', 'toBeDeleted1'],
  });
  await Ingredient.insertMany([ingredient1, ingredient2, ingredient3]);
  let sandwich1 = new Sandwich({
    breadType: 'White1',
    ingredientsID: [ingredient1._id, ingredient2._id],
  });
  await sandwich1.save();
  return sandwich1._id;
}
describe('Sandwich methods', () => {
  // Function 1: addStatistic
  test('addStatistic takes a sandwich and makes a statistic out of it', async () => {
    // Populate database and get sandwich
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
    await Ingredient.deleteMany({ name: 'UniqueIngredient1' });
    await Sandwich.deleteOne({ _id: sandwichID });
    await StatSandwich.deleteOne({ ingredientsHash: localHash });
  }, 20000);

  // Function 2: calculatePrice

  test('calculatePrice calculates the price of a sandwich', async () => {
    let sandwich1 = await Sandwich.findOne({ breadType: 'White1' });
    expect(sandwich1.price).toBe(undefined);
    let price = await sandwich1.calculatePrice();
    expect(price).toBe(2 + 0.5 + 1);
    // Clear generated things

    await Sandwich.deleteOne({ _id: sandwich1._id });
  }, 20000);

  // Function 3: getHash
  // No real way to test this other than repeat the code of the function
});
