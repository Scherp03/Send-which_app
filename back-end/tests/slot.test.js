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
  }, 20000);
});

//Fetch data of all slots
describe('GET api/v1/slots', () => {
  test('It should respond with 201 and a message', async () => {
    const slot = await Slot.find();

    const response = await request(app).get('/api/v1/slots');
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);

    for (let i = 0; i < response.body.slots.length; i++) {
      expect(response.body.slots[i]._id.toString()).toEqual(
        slot[i]._id.toString(),
      );
    }
  }, 20000);
});

//Fetch data of a slot given its ID
describe('GET api/v1/slots/:id', () => {
  test('It should respond with 200 and a message', async () => {
    const slot = await Slot.findOne();
    const expectedtime =
      slot.time.getHours() +
      ':' +
      (slot.time.getMinutes() < 10 ? '0' : '') +
      slot.time.getMinutes();
    const response = await request(app).get(`/api/v1/slots/${slot._id}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        success: true,
        time: expectedtime,
      }),
    );
  }, 20000);
});
