import app from '../app.js';
import request from 'supertest';
import mongoose from 'mongoose';

beforeAll(async () => {
  const dbUri =
    'mongodb+srv://WritingPurposeUser:FpKwCBXmZh7uSvfA@test1.sdy9unk.mongodb.net/Test_Jest1?retryWrites=true&w=majority';
  await mongoose.connect(dbUri);
}, 20000);

afterAll(async () => {
  await mongoose.connection.close();
}, 20000);

// Get url to redirect to google
describe('POST /api/v1/request', () => {
  test('Should respond with 200 status code and a message', async () => {
    const response = await request(app).post('/api/v1/requestgoogle');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        success: true,
      }),
    );
  }, 20000);
});
