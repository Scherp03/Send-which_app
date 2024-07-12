import app from '../app.js';
import request from 'supertest';

const googleUrl =
  'https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile%20openid&prompt=consent&response_type=code&client_id=999278747711-tkbd9d81i5nnsml3k46nv8bgen2209bu.apps.googleusercontent.com&redirect_uri=http%3A%2F%2F127.0.0.1%3A3000%2Foauth';

// Get url to redirect to google
describe('POST /api/v1/request', () => {
  test('Should respond with 200 status code and a message', async () => {
    const response = await request(app).post('/api/v1/requestgoogle');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        success: true,
        url: googleUrl,
      }),
    );
  }, 10000);
});
