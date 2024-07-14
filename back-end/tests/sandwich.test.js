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

// Create a new sandwich
describe('POST /api/v1/sandwich', () => {
  test('should fail to create a new sandwich if a parameter is missing', async () => {
    // Add ingredients
    let ingredient1 = new Ingredient({
      name: 'Tomato5',
      price: 0.5,
      quantity: 10,
      tags: ['vegetarian', 'vegan', 'toBeDeleted5'],
    });
    let ingredient2 = new Ingredient({
      name: 'Cheese5',
      price: 1,
      quantity: 20,
      tags: ['vegetarian', 'lactose', 'toBeDeleted5'],
    });
    await Ingredient.insertMany([ingredient1, ingredient2]);

    // Test if one parameter is missing
    let response1 = await request(app)
      .post('/api/v1/sandwich')
      .send({
        // breadType: 'White5',
        ingredientsID: [ingredient1._id, ingredient2._id],
      });
    expect(response1.statusCode).toBe(400);
    expect(response1.body.success).toBe(false);
  });

  test('Should respond with a 201 status code if all tests pass', async () => {
    // Test with all parameters, different from another sandwich
    let ingredient1 = await Ingredient.findOne({ name: 'Tomato5' });
    let ingredient2 = await Ingredient.findOne({ name: 'Cheese5' });
    let response2 = await request(app)
      .post('/api/v1/sandwich')
      .send({
        breadType: 'White5',
        ingredientsID: [ingredient1._id, ingredient2._id],
      });
    expect(response2.statusCode).toBe(200);
    expect(response2.body.success).toBe(true);
    // Use price and bread to verify if the sandwich is the same or equivalent
    expect(response2.body.sandwichPrice).toBe(
      2 + ingredient1.price + ingredient2.price,
    );
    expect(response2.body.sandwichBread).toBe('White5');
  });

  test('Should respond with a 201 status code if all tests pass AND the sandwich already exists', async () => {
    let ingredient1 = await Ingredient.findOne({ name: 'Tomato5' });
    let ingredient2 = await Ingredient.findOne({ name: 'Cheese5' });
    let response3 = await request(app)
      .post('/api/v1/sandwich')
      .send({
        breadType: 'White5',
        ingredientsID: [ingredient1._id, ingredient2._id],
      });

    expect(response3.statusCode).toBe(200);
    expect(response3.body.success).toBe(true);
    // Use price and bread to verify if the sandwich is the same or equivalent
    expect(response3.body.sandwichPrice).toBe(
      2 + ingredient1.price + ingredient2.price,
    );
    expect(response3.body.sandwichBread).toBe('White5');

    // Delete everything that was creted in these tests
    let sandwich1 = Sandwich.findOne({ breadType: 'White5' });
    await Ingredient.deleteMany({ tags: 'toBeDeleted5' });
    await Sandwich.deleteOne({ _id: sandwich1._id });
  });
});
