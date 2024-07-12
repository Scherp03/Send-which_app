import app from '../app.js';
import request from 'supertest';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.DB_URI) {
  throw new Error(
    'Test suite stopped beacuse necessary URI environmental variable for MongoDB connection is missing',
  );
}
const dbUri = process.env.DB_URI;

describe('Server start and DB connection', () => {
  beforeAll(async () => {
    await mongoose.connect(dbUri);
    // console.log(`Database \'${process.env.DB_NAME}\' connected for testing!`);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    // console.log('Database connection closed');
  });

  test('GET / should return 200', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Welcome to homepage!');
  }, 20000);
});
