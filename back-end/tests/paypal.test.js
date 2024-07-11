// Import required modules
import express from 'express';
import { createOrder } from '../paypal/services/paypal_serv.js';
import app from '../app.js';
import request from 'supertest';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import UserTypeModel from '../database/schemas/userType.js';


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
  await mongoose.connection.close();
   console.log('Database connection closed');
});

  describe('POST /api/v1/paypal/pay', () => {
    test('Should respond with 200 status code and a message', async () => {
      const payload = {
        amount: 100,
        currency: 'EUR',
        description: 'Test payment',
        
      };
      
  
      const response = await request(app)
        .post('/api/v1/paypal/pay')
        .send(payload)
        
      expect(response.statusCode).toBe(200);
  
    }, 10000); // Timeout set to 10 seconds
  });

  

/*describe('Express Server Tests', () => {
  let app;

  beforeAll(() => {
    app = express();
    app.set('view engine', 'ejs');
  });

  test('GET / should render index view', () => {
    // Write test to check if '/' route renders the 'index' view
  });

  test('POST /pay should redirect to order URL', async () => {
    // Mock createOrder function to return a URL
    createOrder.mockReturnValueOnce('mocked-order-url');
    
    // Write test to check if '/pay' route redirects to the URL returned by createOrder
  });

  test('GET /complete-order should send "Complete Order"', () => {
    // Write test to check the response of '/complete-order' route
  });

  test('GET /cancel-order should redirect to /', () => {
    // Write test to check the redirection of '/cancel-order' route
  });

  afterAll(() => {
    // Clean up after all tests
  });
});

describe('Event Handling Tests', () => {
  test('uncaughtException event handler should log error', () => {
    // Write test to check the 'uncaughtException' event handler
  });
});

describe('Server Listening Test', () => {
  test('Server should start listening on port 3000', () => {
    // Write test to check if the server starts listening on port 3000
  });
});*/