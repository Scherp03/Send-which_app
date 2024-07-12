import app from '../app.js';
import request from 'supertest';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Ingredient from '../database/schemas/ingredient.js';
import Sandwich from '../database/schemas/sandwich.js';

dotenv.config();

if (!process.env.DB_URI) {
  throw new Error(
    'Test suite stopped beacuse necessary URI environmental variable for MongoDB connection is missing',
  );
}
const dbUri = process.env.DB_URI;

beforeAll(async () => {
  await mongoose.connect(dbUri);
  let ingredient1 = new Ingredient({
    name: 'Salad_test',
    price: 2.7,
    quantity: 15,
  });
  let ingredient2 = new Ingredient({
    name: 'Ham_test',
    price: 0.2,
    quantity: 27,
  });
  await Ingredient.insertMany([ingredient1, ingredient2]);
  const sandwichGet = new Sandwich({
    breadType: 'Integral',
    ingredientsID: [ingredient1._id, ingredient2._id],
    price: 4.9,
  });
  await Sandwich.create(sandwichGet);
});

afterAll(async () => {
  await Ingredient.deleteMany({});
  await Sandwich.deleteMany({});
  await mongoose.connection.close();
});

//Create new sandwich
describe('POST /api/v1/sandwich', () => {
  test('Should respond with 200 status code and a message', async () => {
    let ingredient1 = new Ingredient({
      name: 'Tomato_test',
      price: 0.5,
      quantity: 10,
    });
    let ingredient2 = new Ingredient({
      name: 'Cheese_test',
      price: 1,
      quantity: 20,
    });
    await Ingredient.insertMany([ingredient1, ingredient2]);
    let sandwich = {
      breadType: 'White',
      ingredientsID: [ingredient1._id, ingredient2._id],
    };
    const response = await request(app).post('/api/v1/sandwich').send(sandwich);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        success: true,
        sandwichPrice: 3.5,
      }),
    );
  }, 20000);
});

//Fetch data of a single sandwich
describe('GET /api/v1/sandwich', () => {
  test('should respond with a 200 status code and a message', async () => {
    // retrive the sandwich created at the beginning
    const sandwich = await Sandwich.findOne({ price: 4.9 });

    const response = await request(app).get(`/api/v1/sandwich/${sandwich._id}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        success: true,
        sandwichId: sandwich._id.toString(), // Convert ObjectId to string
        sandwichIngredientsId: sandwich.ingredientsID.map((id) =>
          id.toString(),
        ), // Convert each ObjectId in the array to string
        sandwichPrice: sandwich.price,
      }),
    );
  }, 20000);
});

//Fetch data of all sandwiches
describe('GET /api/v1/sandwich', () => {
  test('should respond with a 200 status code and a message', async () => {
    const response = await request(app).get(`/api/v1/sandwich`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        success: true,
      }),
    );
  }, 20000);
});
