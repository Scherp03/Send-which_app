import app from '../app.js';
import request from 'supertest';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../database/schemas/user.js';
import { Roles } from '../../shared/userTypeDefinitions.js';
import UserTypeModel from '../database/schemas/userType.js';

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
  console.log(`Database \'${process.env.DB_NAME}\' connected for testing!`);

  // create a mock user for testing
  const hashedPassword = await bcrypt.hash('pswd_test', 10);
  const mockUser = {
    firstName: 'name_test',
    lastName: 'surname_test',
    username: 'username_test',
    email: 'email@_test',
    password: hashedPassword,
    userType: Roles.USER,
  };
  await User.create(mockUser);
});

afterAll(async () => {
  await User.deleteOne({ username: 'username_test' });
  await mongoose.connection.close();
  console.log('Database connection closed');
});

const correctLogin = {
  username: 'username_test',
  password: 'pswd_test',
};

// Correct login
describe('POST api/v1/auth/login', () => {
  test('Should respond with 200 status code and a message', async () => {
    const response = await request(app)
      .post('/api/v1/auth/login')
      .send(correctLogin);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        success: true,
        message: 'Welcome to your account, username_test!',
      }),
    );
  }, 10000); // Timeout set to 10 seconds
});

const wrongPasswd = {
  username: 'username_test',
  password: 'wrongpswdziopera',
};

// login with wrong password
describe('POST api/v1/auth/login', () => {
  test('Should respond with 400 status code and an error message', async () => {
    const response = await request(app)
      .post('/api/v1/auth/login')
      .send(wrongPasswd);
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(
      expect.objectContaining({
        success: false,
        message: 'Wrong password!',
      }),
    );
  }, 10000); // Timeout set to 10 seconds
});

const randomUsername = {
  username: 'random_username',
  password: 'randompswd',
};

// Login with unregistered user or insert wrong username
describe('POST api/v1/auth/login', () => {
  test('Should respond with 404 status code and an error message', async () => {
    const response = await request(app)
      .post('/api/v1/auth/login')
      .send(randomUsername);
    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual(
      expect.objectContaining({
        success: false,
        message: "Cannot find user 'random_username' in our database",
      }),
    );
  }, 10000); // Timeout set to 10 seconds
});

const emptyField = {
  username: 'username_test',
};

// Login with empty fields
describe('POST api/v1/auth/login', () => {
  test('Should respond with 400 status code and an error message', async () => {
    const response = await request(app)
      .post('/api/v1/auth/login')
      .send(emptyField);
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(
      expect.objectContaining({
        success: false,
        message: 'Missing some parameters',
      }),
    );
  }, 10000); // Timeout set to 10 seconds
});
