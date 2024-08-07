import app from '../app.js';
import request from 'supertest';
import mongoose from 'mongoose';

beforeAll(async () => {
  const dbUri =
    'mongodb+srv://WritingPurposeUser:FpKwCBXmZh7uSvfA@test1.sdy9unk.mongodb.net/Test_Jest2?retryWrites=true&w=majority';
  await mongoose.connect(dbUri);
}, 20000);

// no need to delete the user created since it's done by the test
afterAll(async () => {
  await mongoose.connection.close();
}, 20000);

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
  }, 20000);

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
  }, 20000);
});

// Fetch user

// login credentials
const correctLogin = {
  username: 'ermeio94',
  password: 'ILoveUbuntu123',
};

describe('GET /api/v1/users', () => {
  test('should respond with a 200 status code and a message', async () => {
    // first need to login to retrive the access token and id
    const loginData = await request(app)
      .post('/api/v1/auth/login')
      .send(correctLogin);
    const userId = loginData.body.id;
    const accessToken = loginData.body.token;
    // patch to modify
    const response = await request(app)
      .get(`/api/v1/users/${userId}`)
      .set('authorization', `Bearer ${accessToken}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        success: true,
        firstName: 'John',
        lastName: 'Doe',
        username: 'ermeio94',
        email: 'john.doe@gmail.com',
      }),
    );
  }, 20000);
});

// updated credentials
const userUpdate = {
  firstName: 'Giovanni',
  username: 'newusername',
  password: 'NewPasswdKek666',
};

// update user

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
  }, 20000);
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
  }, 20000);
});
