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

export const updateUser = async(req, res, next) => {
    
    // exports.updateUser = async (req, res, next) => {
    //     try {
    //         // Get user access
    //         let requestantPermission = await getUserPermission(req.userId);
    //         let userId;
    //         // If it is a "CapoReparto", than it can edit everyone
    //         if (requestantPermission == "CapoReparto"){
    //             userId = req.query.id ? req.query.id : req.userId;
    //         // If the query id, than it can edit only himself
    //         }else if(req.query.id === undefined){
    //             userId = req.userId;
    //         // Otherwise no authorization should be granted
    //         }else{
    //             const error = new Error("Not enough permission.");
    //             error.statusCode = 403;
    //             throw error;
    //         }
    //         // Check ID validity
    //         if(!validIdRegex.test(userId)){
    //             const error = new Error("User not found");
    //             error.statusCode = 404;
    //             throw error;
    //         }
    //         // Check the parameters
    //         let updatedData = {};
    //         if(req.body.name) updatedData.name = req.body.name;
    //         if(req.body.surname) updatedData.surname = req.body.surname;
    //         if(req.body.gender) updatedData.gender = req.body.gender;
    //         if(req.body.dept) updatedData.dept = req.body.dept;
    //         if(req.body.userType) updatedData.userType = req.body.userType;
    //         if(req.body.iban) updatedData.iban = req.body.iban;
    //         if(req.body.phone) updatedData.phone = req.body.phone;
    //         if(req.body.address) updatedData.address = req.body.address;
    //         if(req.body.weeklyHours) updatedData.weeklyHours = req.body.weeklyHours;
    //         if(req.body.password) updatedData.password = bcrypt.hashSync(req.body.password);
    //         // Check the user existance
    //         let user = await userModel.User.findById(userId);
    //         if(!user){
    //             const error = new Error("User not found");
    //             error.statusCode = 404;
    //             throw error;
    //         }
    //         await userModel.User.updateOne({_id: userId}, {$set: updatedData});
    //         /*
    //         // If it doesn't exists, create it
    //         let createdUser = await userModel.User.create(newUser);*/
    //         res.status(200).json({
    //             message: "User modified",
    //         });
    //     }catch (err) {
    //         if (!err.statusCode) {
    //           err.statusCode = 500;
    //         }
    //         next(err);
    //     }
    // };
    
    
    try {
        
    } catch (err) {
        console.log(err.message);
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

export const deleteUser = async(req, res, next) => {
    if(!req.loggedUserId) return res.status(400).json({success: false, message: `Not logged`});
    try {
        const user = await UserModel.findOneAndDelete({username: req.loggedUserId});
        if(!user) {
            return res.status(404).json({message: `Something went wrong`});
        }
        res.status(200).json(user);
    } catch (err) {
        console.log(err.message);
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};