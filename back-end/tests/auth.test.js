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

// create a mock user for testing
const mockUser = {
  firstName: 'name_test',
  lastName: 'surname_test',
  username: 'username_test',
  email: 'email@_test',
  password: 'pswd_test',
  userType: Roles.USER,
};

beforeAll(async () => {
  await mongoose.connect(dbUri);
  console.log(`Database \'${process.env.DB_NAME}\' connected for testing!`);
  await User.create(mockUser);
});

afterAll(async () => {
  User.deleteOne({ username: 'username_test' });
  await mongoose.connection.close();
  console.log('Database connection closed');
});

describe('POST /auth/login', () => {
  test('Correct login', async () => {
    const response = await request(app).post('/login').send();
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        success: true,
        message: expect.stringContaining(''),
      }),
    );
  });
});
