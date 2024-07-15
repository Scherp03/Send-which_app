import app from '../app.js';
import request from 'supertest';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Order from '../database/schemas/order.js';
import User from '../database/schemas/user.js';

dotenv.config();

beforeAll(async () => {
  const dbUri =
    'mongodb+srv://WritingPurposeUser:FpKwCBXmZh7uSvfA@test1.sdy9unk.mongodb.net/Test_Jest1?retryWrites=true&w=majority';

  await mongoose.connect(dbUri);

  const userid = new mongoose.Types.ObjectId();
  const slotid = new mongoose.Types.ObjectId();
  const content = new mongoose.Types.ObjectId();
  const testorder = new Order({
    userID: userid,
    slotID: slotid,
    content: content,
    total: 20.0,
    status: 'toDo',
    date: new Date()
  });
  testorder.date.setUTCHours(testorder.date.getUTCHours() + 1);
  await Order.create(testorder);
}, 20000);

afterAll(async () => {
  await Order.deleteMany({});
  await mongoose.connection.close();
});

//Create new Order

describe('POST /api/v1/order', () => {
  test('Should respond with 200 status code and a message', async () => {
    const testUser = new User({
      password: 'password',
      userType: 'User',
      email: 'email',
      username: 'username',
      lastName: 'lastname',
      firstName: 'firstname',
    });

    const user = await User.create(testUser);
    let order = {
      userID: user._id,
      slotID: new mongoose.Types.ObjectId(),
      content: new mongoose.Types.ObjectId(),
      total: 100.0,
      status: 'completed',
      date: new Date(),
    };
    order.date.setUTCHours(order.date.getUTCHours() + 1);

    const response = await request(app).post('/api/v1/order/').send(order);
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.userID.toString()).toEqual(user._id.toString());

    await User.deleteOne({ _id: user._id });
  }, 20000);
});

//Fetch data of a single order
describe('GET /api/v1/order/:id', () => {
  test('should respond with a 200 status code and a message', async () => {
    // retrive the order created at the beginning
    const order = await Order.findOne({ total: 20.0 });

    const response = await request(app).get(`/api/v1/order/${order._id}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        success: true,
        orderId: order._id.toString(), // Convert ObjectId to string
        slotID: order.slotID.toString(),
        content: order.content.toString(),
        total: 20.0,
        status: order.status,
        date: order.date.toDateString(),
      }),
    );
  }, 20000);
});

//Fetch data of all orders
describe('GET /api/v1/order', () => {
  test('should respond with a 200 status code and a message', async () => {
    const order = await Order.find();

    const response = await request(app).get(`/api/v1/order`);
    expect(response.statusCode).toBe(200);

    for (let i = 0; i < response.body.orders.lenght; i++) {
      expect(response.body.orders[i]._id).toEqual(order[i]._id);
    }
  }, 20000);
});

//Fetch data of a given status
describe('GET /api/v1/order/status/:status', () => {
  test('should respond with a 200 status code and a message', async () => {
    // retrive the order created at the beginning
    const order = await Order.find({ status: 'toDo' });

    const response = await request(app).get(
      `/api/v1/order/status/${order[0].status}`,
    );
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        success: true,
      }),
    );
    for (let i = 0; i < response.body.orders.lenght; i++) {
      expect(response.body.orders[i].status).toEqual('toDo');
    }
  }, 20000);
});

//Update status of a single order
describe('PATCH /api/v1/order/:id', () => {
  test('should respond with a 200 status code and a message', async () => {
    // retrive the order created at the beginning
    const order = await Order.findOne({ total: 20.0 });

    const response = await request(app).patch(`/api/v1/order/${order._id}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        success: true,
        message: 'Order status updated to completed',
        orderId: order._id.toString(), // Convert ObjectId to string
        slotID: order.slotID.toString(),
        content: order.content.toString(),
        total: 20.0,
        status: 'completed',
        date: order.date.toDateString(),
      }),
    );
  }, 20000);
});

// Create a new order
describe('POST /api/v1/order', () => {
  test('should fail to create a new order if a parameter is missing', async () => {
    // Test if one parameter is missing
    let response1 = await request(app).post('/api/v1/order').send({
      userID: new mongoose.Types.ObjectId(),
      slotID: new mongoose.Types.ObjectId(),
      content: new mongoose.Types.ObjectId(),
      //total: 100.00,
      status: 'failed',
      date: new Date(),
    });
    
    expect(response1.statusCode).toBe(400);
    expect(response1.body.success).toBe(false);
  }, 20000);

  test('should fail to create a new order if UserID does not exist', async () => {
    // Test if User ID doe not exist
    let response1 = await request(app).post('/api/v1/order').send({
      userID: new mongoose.Types.ObjectId(),
      slotID: new mongoose.Types.ObjectId(),
      content: new mongoose.Types.ObjectId(),
      total: 100.0,
      status: 'failed',
      date: new Date(),
    });
    
    expect(response1.statusCode).toBe(401);
    expect(response1.body.success).toBe(false);
  }, 20000);
});

// get a single order by id
describe('GET /api/v1/order/:id', () => {
  test('should respond with a 200 status code and a message', async () => {
    // test if id does not exist
    const orderid = new mongoose.Types.ObjectId();

    const response = await request(app).get(`/api/v1/order/${orderid}`);
    expect(response.statusCode).toBe(404);
    expect(response.body.success).toBe(false);
  }, 20000);
});

//Fetch data of a given status
describe('GET /api/v1/order/status/:status', () => {
  test('should respond with a 200 status code and a message', async () => {
    // test if the status does not exist
    const status = "it doesn't exist";
    const order = await Order.find({ status: status });

    const response = await request(app).get(`/api/v1/order/status/${status}`);
    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual(
      expect.objectContaining({
        success: false,
        message: `Orders with status ${status} not found`,
      }),
    );
  }, 20000);
});

//Update status of a single order
describe('PATCH /api/v1/order/:id', () => {
  test('should respond with a 404 status code and a message', async () => {
    // test if the id does not exist
    const orderid = new mongoose.Types.ObjectId();

    const response = await request(app).patch(`/api/v1/order/${orderid}`);
    expect(response.statusCode).toBe(404);
    expect(response.body.success).toBe(false);
  }, 20000);
});
