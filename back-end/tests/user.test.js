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

//Create new user correctly
describe('POST /api/v1/users', () => {
  test('Should respond with 200 status code and a message', async () => {
    const userCorrect = {
      firstName: 'John',
      lastName: 'Doe',
      username: 'johndoe',
      email: 'john.doe@gmail.com',
      password: 'ILoveUbuntu123',
    };
    const response = await request(app).post('/api/v1/users').send(userCorrect);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        success: true,
        message: `User \'${userCorrect.username}\' created successfully`,
      }),
    );
  });

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
  });
});

// Update user
// describe('PATCH /api/v1/users', () => {
//   test('', async () => {
//     const userUpdate = {};
//     const response = await request(app).patch('/api/v1/users').send(userUpdate);
//     expect(response.statusCode).toBe(200);
//     expect(response.body).toEqual(
//       expect.objectContaining({
//         success: true,
//         message: '',
//       }),
//     );
//   });
// });

// Delete user
// describe('DELETE /api/v1/users', () => {
//   test('', async () => {
//     const userDelete = {};
//     const response = await request(app).delete('/api/v1/users').send(userDelete);
//     expect(response.statusCode).toBe(200);
//     expect(response.body).toEqual(
//       expect.objectContaining({
//         success: true,
//         message: ''
//       }),
//     );
//   });
// });
