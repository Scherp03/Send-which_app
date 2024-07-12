import OrderModel from '../database/schemas/order.js';
import SandwichModel from '../database/schemas/sandwich.js';
import UserModel from '../database/schemas/user.js';
import mongoose from 'mongoose';


const newOrder = new OrderModel({

   userID: req.body.userID,
   slotID: req.body.slotID,
   content: [],
   total: req.body.total,
   date: req.body.date,
  });

  export const createUser = async (req, res, next) => {
    res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
    try {
      if (
        !req.body.userID ||
        !req.body.slotID ||
        !content[] ||
        !req.body.total ||
        !req.body.date
      ) {
        return res
          .status(400)
          .json({ success: false, message: `Missing some parameters` });
      }
      const newOrder = new OrderModel({

        userID: req.body.userID,
        slotID: req.body.slotID,
        content: [],
        total: req.body.total,
        date: req.body.date,
       });
      
      // check if UserID exists (ho usato username)
      const userID = await UserModel.findOne({ username: newUser.username });               // userID doesnt exist, neet to change the parameter we use to check //Used username 
      if (!username) {
        return res.status(401).json({
          success: false,
          message: ` Username \'${user.username}\' not found`,
        });
      }
    
    } catch (err) {
      console.log(err.message);
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  };