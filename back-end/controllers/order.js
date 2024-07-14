import OrderModel from '../database/schemas/order.js';

import UserModel from '../database/schemas/user.js';
import mongoose from 'mongoose';


  export const createOrder = async (req, res, next) => {
    res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
    try {
      if (
        !req.body.userID ||
        !req.body.slot ||
        !req.body.content||
        !req.body.status||
        !req.body.total ||
        !req.body.date
      ) {
        return res
          .status(400)
          .json({ success: false, message: `Missing some parameters` });
      }
      let newOrder = new OrderModel({

        userID: req.body.userID,
        slot: req.body.slot,
        content: req.body.content,
        total: req.body.total,
        status: req.body.status,
        date: req.body.date,
       });
      
      
      const User = await UserModel.findOne({ _id: newOrder.userID });               
      if (!User) {
        return res.status(401).json({
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
        success:true,
      })
    
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
        return res.status(400).json({ success: false, message: 'Order ID is required' });
      }
      
      const order = await OrderModel.findById(id);
      if (!order) {
        
        return res.
        status(404).
        json({ success: false, message: 'Order not found' });
      }
  
      return res.status(200).json({
        success: true,
        order,
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
      return res.status(200).json({
        success: true,
        orders,
      });
    } catch (err) {
      console.log(err.message);
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  };
  export const viewToDo = async (req, res, next) => {
    res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
    try {
      const toDoOrders = await OrderModel.find({ status: 'toDo' });
      return res.status(200).json({
        success: true,
        orders: toDoOrders,
      });
    } catch (err) {
      console.log(err.message);
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  };