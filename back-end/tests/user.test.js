import app from '../app.js';
import request from 'supertest';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../database/schemas/user.js';

dotenv.config();

const dbUri =
  'mongodb+srv://' +
  process.env.DB_CREDENTIALS +
  '@' +
  process.env.DB_HOST +
  '/' +
  process.env.DB_NAME +
  '?retryWrites=true&w=majority';

beforeAll(async () => {
  await mongoose.connect(dbUri);
  // console.log(`Database \'${process.env.DB_NAME}\' connected for testing!`);
});

// no need to delete the user created since it's done by the test
afterAll(async () => {
  await mongoose.connection.close();
  // console.log('Database connection closed');
});

//Create new user correctly
describe('POST /api/v1/users', () => {
  test('Should respond with 200 status code and a message', async () => {
    const userCorrect = {
      firstName: 'John',
      lastName: 'Doe',
      username: 'ermeio94',
      email: 'john.doe@gmail.com',
      password: 'ILoveUbuntu123',
    };
    const response = await request(app).post('/api/v1/users').send(userCorrect);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        success: true,
        message: `User \'${userCorrect.username}\' created successfully!`,
      }),
    );
  }, 10000);

  // Create new user with empty fields
  test('Should respond with 400 status code and an error message', async () => {
    const userWrong = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@gmail.com',
    };
    const response = await request(app).post('/api/v1/users').send(userWrong);
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(
      expect.objectContaining({
        success: false,
        message: 'Missing some parameters',
      }),
    );
  }, 10000);
});

// Update user

// login credentials
const correctLogin = {
  username: 'ermeio94',
  password: 'ILoveUbuntu123',
};

// updated credentials
const userUpdate = {
  firstName: 'Giovanni',
  username: 'newusername',
  password: 'NewPasswdKek666',
};

describe('PATCH /api/v1/users', () => {
  test('should respond with a 200 status code and a message', async () => {
    // first need to login to retrive the access token and id
    const loginData = await request(app)
      .post('/api/v1/auth/login')
      .send(correctLogin);
    const userId = loginData.body.id;
    const accessToken = loginData.body.token;
    // patch to modify
    const response = await request(app)
      .patch(`/api/v1/users/${userId}`)
      .set('authorization', `Bearer ${accessToken}`)
      .send(userUpdate);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        success: true,
        message: 'User modified successfully',
      }),
    );
  }, 10000);
});

const newCorrectLogin = {
  username: 'newusername',
  password: 'NewPasswdKek666',
};

// Delete user
describe('DELETE /api/v1/users', () => {
  test('should respond with a 200 status code and a message', async () => {
    // first need to login to retrive the access token and id
    const loginData = await request(app)
      .post('/api/v1/auth/login')
      .send(newCorrectLogin);
    const userId = loginData.body.id;
    const accessToken = loginData.body.token;

    // actual user deletion
    const response = await request(app)
      .delete(`/api/v1/users/${userId}`)
      .set('authorization', `Bearer ${accessToken}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        success: true,
        message: "User 'newusername' deleted successfully",
      }),
    );
  }, 10000);
});
