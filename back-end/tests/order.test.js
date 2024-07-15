import app from '../app.js';
import request from 'supertest';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Order from '../database/schemas/order.js';


dotenv.config();

if (!process.env.DB_URI) {
  throw new Error(
    'Test suite stopped beacuse necessary URI environmental variable for MongoDB connection is missing',
  );
}
const dbUri = process.env.DB_URI;

beforeAll(async () => {
  await mongoose.connect(dbUri);

  const userid= new mongoose.Types.ObjectId();
  const slotid= new mongoose.Types.ObjectId();
  const content= new mongoose.Types.ObjectId();
  const testorder = new Order({
    userID: userid,
    slotID: slotid,
    content: content,
    total: 20.00,
    status:"toDo",
    date: "2024-07-14T10:00:00Z"
  });
  await Order.create(testorder);
});

afterAll(async () => {
  
  await Order.deleteMany({});
  await mongoose.connection.close();
});

//Create new Order

describe('POST /api/v1/order', () => {
  test('Should respond with 200 status code and a message', async () => {
    
    
    let order ={
        userID: '66911534bfdb6baef71e8c8d',
        slotID: new mongoose.Types.ObjectId(),
        content: new mongoose.Types.ObjectId(),
        total: 100.00,
        status:'toDo',
        date: '2024-07-14T15:00:00.000+00:00'
    };
    const response = await request(app).post('/api/v1/order/').send(order);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        success: true,
        userID:'66911534bfdb6baef71e8c8d'
      }),
    );
  }, 20000);
});

//Fetch data of a single order
describe('GET /api/v1/order/:id', () => {
  test('should respond with a 200 status code and a message', async () => {
    // retrive the order created at the beginning
    const order = await Order.findOne({total :20.00 });

    const response = await request(app).get(`/api/v1/order/${order._id}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        success: true,
        orderId: order._id.toString(), // Convert ObjectId to string
        slotID:order.slotID.toString(),
        content: order.content.toString(),
        total: 20.00,
        status: order.status,
        date: order.date.toDateString()
      }),
    );
  }, 20000);
});

//Fetch data of all orders
describe('GET /api/v1/order', () => {
  test('should respond with a 200 status code and a message', async () => {
    const response = await request(app).get(`/api/v1/order`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        success: true,
      }),
    );
  }, 20000);
});
/*
//Fetch data of a given status
describe('GET /api/v1/order/status/:status', () => {
    test('should respond with a 200 status code and a message', async () => {
        // retrive the order created at the beginning
        const order = await Order.find({ status: "toDo" });
        


    const response = await request(app).get(`/api/v1/order/status/${order.status}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(
        expect.objectContaining({
            success: true,
            orders: [
                {
                  orderId: order._id, 
                  slotID: order.slotID,
                  content: order.content,
                  total: order.total,
                  status: 'toDo',
                  //date: order.date.toDateString() 
                }
              ]
          })
        );
      }, 20000);
    });
*/


//Updatestatus of a single order
describe('PATCH /api/v1/order/:id', () => {
    test('should respond with a 200 status code and a message', async () => {
      // retrive the order created at the beginning
      const order = await Order.findOne({total :20.00 });
  
      const response = await request(app).patch(`/api/v1/order/${order._id}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(
        expect.objectContaining({
          success: true,
          message: "Order status updated to completed",
          orderId: order._id.toString(), // Convert ObjectId to string
          slotID:order.slotID.toString(),
          content: order.content.toString(),
          total: 20.00,
          status: 'completed',
          date: order.date.toDateString()
        }),
      );
    }, 20000);
  });
    
// Create a new order
describe('POST /api/v1/order', () => {
  test('should fail to create a new order if a parameter is missing', async () => {
    

    // Test if one parameter is missing
    let response1 = await request(app)
      .post('/api/v1/order')
      .send({
        userID: new mongoose.Types.ObjectId,
        slotID: new mongoose.Types.ObjectId,
        content: new mongoose.Types.ObjectId,
        //total: 100.00,
        status:"toDo",
        date: "2024-07-14T10:00:00Z"
      });
    expect(response1.statusCode).toBe(400);
    expect(response1.body.success).toBe(false);
  });
});