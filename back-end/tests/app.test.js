import app from '../app.js';
import request from 'supertest';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

describe('Server start and DB connection', () => {
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
    await mongoose.connection.close();
    console.log('Database connection closed');
  });

  test('GET / should return 200', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
  });
});
