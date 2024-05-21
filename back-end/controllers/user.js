import UserModel from '../database/schemas/user.js';
import bcrypt from 'bcryptjs';

export const createUser = async(req, res, next) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new UserModel({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });
        // Check the user existance
        const user = await UserModel.findOne({username: newUser.username});
        if(user){
            return res.status(400).json({message: `Username \'${user.username}\' already in use`});
        }
        // If new, create it
        let userCreated = await UserModel.create(newUser);
        if(!userCreated) {
            return res.status(400).json({message: `User not created`});
        }    
        res.status(200).json(userCreated);
    } catch (err) {
        console.log(err.message);
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

export const getVerifiedUser = async(req, res, next) => {
    try {
        const user = await UserModel.findOne({username: req.loggedUserId});
        res.status(200).json(user);
    } catch (err) {
        console.log(err.message);
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};