import mongoose from 'mongoose';
import Slot from '../database/schemas/slot.js';
import dotenv from 'dotenv';
import app from '../app.js';
import request from 'supertest';

dotenv.config();

const dbUri = process.env.DB_URI;

beforeAll(async () => {
  await mongoose.connect(dbUri);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('POST api/v1/slots', () => {
  test('It should respond with 201 Created', async () => {
    const response = await request(app)
      .post('/api/v1/slots')
      .send({
        openingTime: new Date('2024-01-01T11:30:00'),
        closingTime: new Date('2024-01-01T14:15:00'),
        slotDuration: new Date('2024-01-01T14:15:00'),
        maxSandwiches: 10,
      });
    expect(response.statusCode).toBe(201);
    expect(response.body).toStrictEqual({
      success: true,
      message: 'Slots added',
    });
  });
});
