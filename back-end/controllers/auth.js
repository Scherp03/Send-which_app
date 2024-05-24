import UserModel from '../database/schemas/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const loginUser = async(req, res, next) => {
    try {
        const user = await UserModel.findOne({username: req.body.username});
        if(!user) return res.status(400).json({success: false, message: `Cannot find user \'${req.body.username}\' in our database`});
        if (await bcrypt.compare(req.body.password, user.password)) {
            const accessToken = jwt.sign({
                username: req.body.username,
            }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
            res.status(200).json({success: true, message : 'Welcome to your account, ' + user.username + '!', id: user._id, token: accessToken});
        } else {
            return res.status(400).json({message: 'Wrong password'});
        }
    } catch (err) {
        console.log(err.message);
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

export const logoutUser = async(req, res, next) => {
    if(!req.loggedUser) return res.status(400).json({success: false, message: `Not logged`});
    try {
        const authHeader = req.headers['authorization'];
        if (authHeader){
            const payload = {};
            const options = {expiresIn: '2s'};
            const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, options);
            res.status(200).json({success: true, message: `user \'${req.loggedUser.username}\' logged out successfully`});
        } else {
            return res.status(400).json({success: false, message: 'Something went wrong'});
        }
    } catch (err) {
        console.log(err.message);
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};