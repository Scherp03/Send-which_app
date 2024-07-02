import UserModel from '../database/schemas/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Roles from '../database/schemas/userType.js';

export const login = async (req, res, next) => {
  try {
    if (!req.body.username || !req.body.password) {
      return res
        .status(400)
        .json({ success: false, message: `Missing some parameters` });
    }
    const user = await UserModel.findOne({ username: req.body.username });
    if (!user)
      return res.status(400).json({
        success: false,
        message: `Cannot find user \'${req.body.username}\' in our database`,
      });
    if (await bcrypt.compare(req.body.password, user.password)) {
      // if the password is correct, generate JWT token
      const userType = await Roles.findOne({ id: user.userType });
      const payload = {
        username: req.body.username,
        // both fe and be
        permissions: userType.permissions,
      };
      const options = { expiresIn: '8h' };
      const access_key = jwt.sign(
        payload,
        process.env.ACCESS_TOKEN_SECRET,
        options,
      );
      res.status(200).json({
        success: true,
        message: 'Welcome to your account, ' + user.username + '!',
        id: user._id,
        token: access_key,
      });
    } else {
      return res.status(400).json({ message: 'Wrong password' });
    }
  } catch (err) {
    console.log(err.message);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const logout = async (req, res, next) => {
  try {
    if (!req.decodedToken)
      return res
        .status(400)
        .json({ success: false, message: `No permissions` });
    // handle token in the front-end
    res.status(200).json({
      success: true,
      message: `user \'${req.decodedToken.username}\' logged out successfully`,
    });
  } catch (err) {
    console.log(err.message);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};