import OrderModel from '../database/schemas/order.js';

import UserModel from '../database/schemas/user.js';

export const createOrder = async (req, res, next) => {
  res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
  try {
    if (
      !req.body.userID ||
      !req.body.slotID ||
      !req.body.content ||
      !req.body.status ||
      !req.body.total
    ) {
      return res
        .status(400)
        .json({ success: false, message: `Missing some parameters` });
    }
    let newOrder = new OrderModel({
      userID: req.body.userID,
      slotID: req.body.slotID,
      content: req.body.content,
      total: req.body.total,
      status: req.body.status,
      date: new Date(),
    });
    newOrder.date.setUTCHours(newOrder.date.getUTCHours() + 1);

    const User = await UserModel.findOne({ _id: newOrder.userID });
    if (!User) {
      return res.status(404).json({
        success: false,
        message: ` UserID  not found, something went wrong`,
      });
    }
    const Order = await OrderModel.create(newOrder);
    if (!Order) {
      return res.status(503).json({
        success: false,
        message: ` Order not created, something went wrong`,
      });
    }
    return res.status(200).json({
      success: true,
      userID: Order.userID,
    });
  } catch (err) {
    console.log(err.message);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const viewOrder = async (req, res, next) => {
  res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: 'Order ID is required' });
    }

    const order = await OrderModel.findById(id);
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: `Orders with ID ${id} not found` });
    }

    return res.status(200).json({
      success: true,
      orderId: order._id.toString(),
      slotID: order.slotID,
      content: order.content,
      total: order.total,
      status: order.status,
      date: order.date.toDateString(),
    });
  } catch (err) {
    console.log(err.message);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const viewAllOrders = async (req, res, next) => {
  res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
  try {
    const orders = await OrderModel.find();
    if (orders.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No order found',
      });
    }

    return res.status(200).json({
      success: true,
      orders: orders.map((order) => ({
        orderId: order._id,
        slotID: order.slotID,
        content: order.content,
        total: order.total,
        status: order.status,
        date: order.date.toDateString(),
      })),
    });
  } catch (err) {
    console.log(err.message);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
export const viewStatus = async (req, res, next) => {
  res.set('Access-Control-Allow-Origin', 'http://localhost:9000');

  try {
    const { status } = req.params;
    if (!status) {
      return res
        .status(400)
        .json({ success: false, message: 'Status is required' });
    }
    const StatusOrders = await OrderModel.find({ status: status });
    if (StatusOrders.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Orders with status ${status} not found`,
      });
    }

    return res.status(200).json({
      success: true,
      orders: StatusOrders.map((order) => ({
        orderId: order._id.toString(),
        slotID: order.slotID.toString(),
        content: order.content.toString(),
        total: order.total,
        status: order.status,
        date: order.date.toDateString(),
      })),
    });
  } catch (err) {
    console.log(err.message);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const changeStatus = async (req, res, next) => {
  res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: 'Order ID is required' });
    }

    let order = await OrderModel.findById(id);
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: 'Order not found' });
    }

    if (order.status === 'completed') {
      return res
        .status(401)
        .json({ success: false, message: 'Order already completed' });
    }

    const result = await OrderModel.updateOne(
      { _id: id, status: 'toDo' },
      { $set: { status: 'completed' } },
    );

    order = await OrderModel.findById(id);

    return res.status(200).json({
      success: true,
      message: 'Order status updated to completed',
      orderId: order._id.toString(),
      slotID: order.slotID,
      content: order.content,
      total: order.total,
      status: order.status,
      date: order.date.toDateString(),
    });
  } catch (err) {
    console.log(err.message);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
