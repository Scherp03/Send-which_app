import UserModel from '../database/schemas/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const authUser = async(req, res, next) => {
    try {
        const user = await UserModel.findOne({username: req.body.username});
        if(!user) return res.status(400).json({success: false, message: `Cannot find user \'${req.body.username}\'`});
        if (await bcrypt.compare(req.body.password, user.password)) {
            const accessToken = jwt.sign({
                username: req.body.username,
            }, process.env.ACCESS_TOKEN_SECRET);
            res.status(200).json({success: true, accessToken: accessToken});
        } else {
            return res.status(400).json({message: 'Not allowed or wrong password'});
        }
    } catch (err) {
        console.log(err.message);
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};