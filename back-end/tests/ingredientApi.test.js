import mongoose from 'mongoose';
import Ingredient from '../database/schemas/ingredient.js';
import dotenv from 'dotenv';
import app from '../app.js';
import request from 'supertest';

dotenv.config();

const dbUri = process.env.DB_URI;

beforeAll(async () => {
  await mongoose.connect(dbUri);
  await populateDatabase();
});

afterAll(async () => {
  await Ingredient.deleteMany({ tags: 'toBeDeleted3' });
  await mongoose.connection.close();
});

describe('GET api/v1/ingredients', () => {
  // test getIngredients
  test('getIngredients should respond with 200 status code and a list of ingredients', async () => {
    let response = await request(app).get('/api/v1/ingredients');
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.ingredients.length).toBe(3);
    expect(response.body.ingredients[0].name).toBe('Tomato');
    expect(response.body.ingredients[1].name).toBe('Cheese');
    expect(response.body.ingredients[2].name).toBe('Ham');
  });
});

async function populateDatabase() {
  let ingredient1 = new Ingredient({
    name: 'Tomato',
    price: 0.5,
    quantity: 10,
    tags: ['vegetarian', 'vegan', 'toBeDeleted3'],
  });
  let ingredient2 = new Ingredient({
    name: 'Cheese',
    price: 1,
    quantity: 20,
    tags: ['vegetarian', 'lactose', 'toBeDeleted3'],
  });
  let ingredient3 = new Ingredient({
    name: 'Ham',
    price: 2,
    quantity: 50,
    tags: ['meat', 'toBeDeleted3'],
  });
  await Ingredient.insertMany([ingredient1, ingredient2, ingredient3]);
}
