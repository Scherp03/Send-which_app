import User from './schemas/user.js';
import UserType from './schemas/userType.js';

const users = [{}, {}];
const userTypes = [{}];

// define all permissions

export const initDb = async () => {
    // reset database
    User.deleteMany();
    for (let user of users) {
        await User.create(user);
    }
    console.log('Users collection populated');
    UserType.deleteMany();
    for (let userType of userTypes) {
        await UserType.create(userType);
    }
    console.log('UserTypes collection populated');
};

export default initDb;
