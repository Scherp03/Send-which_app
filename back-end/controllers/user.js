import UserModel from '../database/schemas/user.js';
import bcrypt from 'bcryptjs';
import { Permissions, Roles } from '../../shared/userTypeDefinitions.js';

export const createUser = async (req, res, next) => {
  res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
  try {
    if (
      !req.body.firstName ||
      !req.body.lastName ||
      !req.body.username ||
      !req.body.email ||
      !req.body.password
    ) {
      return res
        .status(400)
        .json({ success: false, message: `Missing some parameters` });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new UserModel({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      userType: Roles.USER,
    });
    // Check the user existance
    const userUsername = await UserModel.findOne({
      username: newUser.username,
    });
    if (userUsername) {
      return res.status(401).json({
        success: false,
        message: `Username \'${userUsername.username}\' already in use`,
      });
    }
    const userEmail = await UserModel.findOne({ email: newUser.email });
    if (userEmail) {
      return res.status(401).json({
        success: false,
        message: `Email \'${userEmail.email}\' already in use`,
      });
    }
    // If new, create it
    const userCreated = await UserModel.create(newUser);
    if (!userCreated) {
      return res
        .status(503)
        .json({ success: false, message: `User not created` });
    }
    res.status(200).json({
      success: true,
      message: `User \'${userCreated.username}\' created successfully!`,
    });
  } catch (err) {
    console.log(err.message);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const getUser = async (req, res, next) => {
  res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
  if (!req.decodedToken)
    return res.status(403).json({ success: false, message: `No permissions` });
  try {
    const { id } = req.params;
    const user = await UserModel.findById(id);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: `User not found` });
    res.status(200).json({
      success: true,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
    });
  } catch (err) {
    console.log(err.message);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const updateUser = async (req, res, next) => {
  res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
  try {
    if (
      !req.decodedToken
      // && !req.decodedToken.permissions.includes(Permissions.EDITOR)
    ) {
      return res
        .status(403)
        .json({ success: false, message: `No permissions` });
    }
    if (
      !req.body.firstName &&
      !req.body.lastName &&
      !req.body.username &&
      !req.body.email &&
      !req.body.password
    ) {
      return res
        .status(400)
        .json({ success: false, message: 'No data modified' });
    }

    const { id } = req.params;
    // Check the parameters
    let updatedData = {};
    if (req.body.firstName) updatedData.firstName = req.body.firstName;
    if (req.body.lastName) updatedData.lastName = req.body.lastName;
    if (req.body.username) updatedData.username = req.body.username;
    if (req.body.email) updatedData.email = req.body.email;
    if (req.body.password)
      updatedData.password = await bcrypt.hash(req.body.password, 10);
    if (req.body.userType) updatedData.userType = req.body.userType;
    // Check the user existance
    const userUsername = await UserModel.findOne({
      username: updatedData.username,
    });
    if (userUsername) {
      return res.status(400).json({
        success: false,
        message: `Username \'${userUsername.username}\' already in use`,
      });
    }
    const userEmail = await UserModel.findOne({ email: updatedData.email });
    if (userEmail) {
      return res.status(400).json({
        success: false,
        message: `Email \'${userEmail.email}\' already in use`,
      });
    }
    let user = await UserModel.findById(id);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: `User not found` });
    await UserModel.updateOne(
      { username: req.decodedToken.username },
      { $set: updatedData },
    );
    res.status(200).json({
      success: true,
      message: 'User modified successfully',
    });
  } catch (err) {
    console.log(err);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
  try {
    if (
      !req.decodedToken
      //&& !req.decodedToken.permissions.includes(Permissions.EDITOR)
    ) {
      return res
        .status(403)
        .json({ success: false, message: `No permissions` });
    }
    const { id } = req.params;
    const user = await UserModel.findByIdAndDelete(id);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: `User not found` });
    res.status(200).json({
      success: true,
      message: `User \'${user.username}\' deleted successfully`,
    });
  } catch (err) {
    console.log(err.message);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
