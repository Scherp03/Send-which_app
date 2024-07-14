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
    // Verify which ingredients are found
    let found1 = false;
    let found2 = false;
    let found3 = false;
    for (let ingredient of response.body.ingredients) {
      expect(ingredient.active).toBe(true);
      if (ingredient.name === 'Tomato3') {
        found1 = true;
      }
      if (ingredient.name === 'Cheese3') {
        found2 = true;
      }
      if (ingredient.name === 'Ham3') {
        found3 = true;
      }
    }
    expect(found1).toBe(true);
    expect(found2).toBe(true);
    expect(found3).toBe(true);
  });
});

describe('GET api/v1/ingredients/:id', () => {
  // test getIngredient
  test('getIngredient should respond with 200 status code and the ingredient', async () => {
    let ingredient = await Ingredient.findOne({ name: 'Tomato3' });
    let response = await request(app).get(
      '/api/v1/ingredients/' + ingredient._id,
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.ingredient.name).toBe('Tomato3');
  });
});

describe('PATCH api/v1/ingredients/add', () => {
  // test addIngredient
  // Fail if name too short
  test('addIngredient should respond with 400 status code and a message if the name is too short', async () => {
    let response3 = await request(app)
      .patch('/api/v1/ingredients/add')
      .send({
        name: 'Sa',
        price: 1.2,
        quantity: 300,
        tags: ['meat', 'toBeDeleted3'],
      });
    expect(response3.statusCode).toBe(400);
    expect(response3.body.success).toBe(false);
    expect(response3.body.message).toBe('Name too short');
  });
  // Fail if price not a number
  test('addIngredient should respond with 400 status code and a message if the price is not a number', async () => {
    let response4 = await request(app)
      .patch('/api/v1/ingredients/add')
      .send({
        name: 'Salami3',
        price: 'not a number',
        quantity: 300,
        tags: ['meat', 'toBeDeleted3'],
      });
    expect(response4.statusCode).toBe(400);
    expect(response4.body.success).toBe(false);
    expect(response4.body.message).toBe('Price is not a valid number');
  });
  test('addIngredient should respond with 200 status code and the ingredient added', async () => {
    let response1 = await request(app)
      .patch('/api/v1/ingredients/add')
      .send({
        name: 'Salami3',
        price: 1.2,
        quantity: 300,
        tags: ['meat', 'toBeDeleted3'],
      });
    expect(response1.statusCode).toBe(201);
    expect(response1.body.success).toBe(true);
  });
  // Fail if duplicate
  test('addIngredient should respond with 400 status code and a message if the ingredient is a duplicate', async () => {
    let response2 = await request(app)
      .patch('/api/v1/ingredients/add')
      .send({
        name: 'Salami3',
        price: 1.2,
        quantity: 300,
        tags: ['meat', 'toBeDeleted3'],
      });
    expect(response2.statusCode).toBe(400);
    expect(response2.body.success).toBe(false);
    expect(response2.body.message).toBe('Duplicate ingredient');
  });
});

describe('PATCH api/v1/ingredients/setavailability', () => {
  // test setAvailability
  // Fail if availability not a number
  test('setAvailability should respond with 400 status code and a message if the availability is not a number', async () => {
    let ingredient = await Ingredient.findOne({ name: 'Tomato3' });
    let response = await request(app)
      .patch('/api/v1/ingredients/setavailability')
      .send({
        id: ingredient._id,
        availability: 'not a number',
      });
    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Quantity is not valid');
  });
  // Change availability if everything is fine
  test('setAvailability should respond with 200 status code and a message', async () => {
    let ingredient = await Ingredient.findOne({ name: 'Salami3' });
    expect(ingredient.quantity).toBe(300);
    let response = await request(app)
      .patch('/api/v1/ingredients/setavailability')
      .send({
        _id: ingredient._id,
        availability: 22,
      });
    ingredient = await Ingredient.findOne({ name: 'Salami3' });
    expect(ingredient.quantity).toBe(22);
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('Availability updated');
  });
});

describe('PATCH api/v1/ingredients/increaseavailability', () => {
  // test increaseAvailability
  // Fail if availability not a number
  test('increaseAvailability should respond with 400 status code and a message if the availability is not a number', async () => {
    let ingredient = await Ingredient.findOne({ name: 'Tomato3' });
    let response = await request(app)
      .patch('/api/v1/ingredients/increaseavailability')
      .send({
        id: ingredient._id,
        availability: 'not a number',
      });
    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Quantity is not valid');
  });
  // Increase availability if everything is fine
  test('increaseAvailability should respond with 200 status code and a message', async () => {
    let ingredient = await Ingredient.findOne({ name: 'Salami3' });
    expect(ingredient.quantity).toBe(22);
    let response = await request(app)
      .patch('/api/v1/ingredients/increaseavailability')
      .send({
        _id: ingredient._id,
        availability: 5,
      });
    ingredient = await Ingredient.findOne({ name: 'Salami3' });
    expect(ingredient.quantity).toBe(27);
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('Availability updated');
  });
});

describe('DELETE api/v1/ingredients/delete', () => {
  // test deleteIngredient
  test('deleteIngredient should respond with 200 status code and a message', async () => {
    let ingredient = await Ingredient.findOne({ name: 'Salami3' });
    let response = await request(app)
      .delete('/api/v1/ingredients/delete')
      .send({
        _id: ingredient._id,
      });
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('Ingredient deleted');
  });
  test('deleteIngredient should respond with 404 status code and a message if the ingredient is not found', async () => {
    let response = await request(app)
      .delete('/api/v1/ingredients/delete')
      .send({
        _id: new mongoose.Types.ObjectId(),
      });
    expect(response.statusCode).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Ingredient not found');
  });
  test('deleteIngredient should respond with 500 status code and a message if the ingredient is already deleted', async () => {
    let ingredient = await Ingredient.findOne({ name: 'Salami3' });
    let response = await request(app)
      .delete('/api/v1/ingredients/delete')
      .send({
        _id: ingredient._id,
      });
    expect(response.statusCode).toBe(500);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Failed to delete ingredient');
  });
});

describe('PATCH api/v1/ingredients/restoredeleted', () => {
  test('restoreDeleted should respond with 200 status code and a message', async () => {
    let ingredient = await Ingredient.findOne({ name: 'Salami3' });
    let response = await request(app)
      .patch('/api/v1/ingredients/restoredeleted')
      .send({
        name: ingredient.name,
      });
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('Ingredient restored');
  });
  test('restoreDeleted should respond with 404 status code and a message if the ingredient is not found', async () => {
    let response = await request(app)
      .patch('/api/v1/ingredients/restoredeleted')
      .send({
        name: 'not found',
      });
    expect(response.statusCode).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Ingredient not found');
  });
  test('restoreDeleted should respond with 400 status code and a message if the ingredient is already active', async () => {
    let ingredient = await Ingredient.findOne({ name: 'Salami3' });
    let response = await request(app)
      .patch('/api/v1/ingredients/restoredeleted')
      .send({
        name: ingredient.name,
      });
    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Ingredient already active');
  });
});
async function populateDatabase() {
  let ingredient1 = new Ingredient({
    name: 'Tomato3',
    price: 0.5,
    quantity: 10,
    tags: ['vegetarian', 'vegan', 'toBeDeleted3'],
  });
  let ingredient2 = new Ingredient({
    name: 'Cheese3',
    price: 1,
    quantity: 20,
    tags: ['vegetarian', 'lactose', 'toBeDeleted3'],
  });
  let ingredient3 = new Ingredient({
    name: 'Ham3',
    price: 2,
    quantity: 50,
    tags: ['meat', 'toBeDeleted3'],
  });
  await Ingredient.insertMany([ingredient1, ingredient2, ingredient3]);
}
