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
  console.log(`Database \'${process.env.DB_NAME}\' connected for testing!`);
});

afterAll(async () => {
  // will be done by the delete test
  await User.deleteOne({ username: 'johndoe' });
  await mongoose.connection.close();
  console.log('Database connection closed');
});

describe('POST /users', () => {
  test('Create new user correctly', async () => {
    const userCorrect = {
      firstName: 'John',
      lastName: 'Doe',
      username: 'johndoe',
      email: 'john.doe@gmail.com',
      password: 'ILoveUbuntu123',
    };
    const response = await request(app).post('/users').send(userCorrect);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        success: true,
        message: expect.stringContaining(
          `User \'${userCorrect.username}\' created successfully`,
        ),
      }),
    );
  });

  test('Create new user with empty fields', async () => {
    const userWrong = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@gmail.com',
    };
    const response = await request(app).post('/users').send(userWrong);
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(
      expect.objectContaining({
        success: false,
        message: expect.stringContaining('Missing some parameters'),
      }),
    );
  });
});

// describe('PATCH /users', () => {
//   test('Update user', async () => {
//     const userUpdate = {};
//     const response = await request(app).patch('/users').send(userUpdate);
//     expect(response.statusCode).toBe(200);
//     expect(response.body).toEqual(
//       expect.objectContaining({
//         success: true,
//         message: expect.stringContaining(''),
//       }),
//     );
//   });
// });

// describe('DELETE /users', () => {
//   test('Delete user', async () => {
//     const userDelete = {};
//     const response = await request(app).delete('/users').send(userDelete);
//     expect(response.statusCode).toBe(200);
//     expect(response.body).toEqual(
//       expect.objectContaining({
//         success: true,
//         message: expect.stringContaining(''),
//       }),
//     );
//   });
// });
