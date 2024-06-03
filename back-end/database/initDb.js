import User from './schemas/user.js';
import UserType from './schemas/userType.js';
import { Permissions, Roles } from '../../shared/userTypeDefinitions.js';

// initialize all collections
const users = [
  {
    firstName: 'mockName',
    lastName: 'mockSurname',
    username: 'mockUsername',
    email: 'mockEmail@something',
    password: 'mockpswd',
    userType: Roles.USER,
  },
  {
    firstName: 'Luca',
    lastName: 'Carpella',
    username: 'scherp03',
    email: 'luca.carpella@gmail.com',
    password: 'lessgoski69',
    userType: Roles.ADMIN,
  },
];

// define all permissions
const userPerm = [Permissions.VIEWER];
const adminPerm = [Permissions.VIEWER, Permissions.EDITOR];

const userTypes = [
  { id: Roles.USER, permissions: userPerm },
  { id: Roles.ADMIN, permissions: adminPerm },
];

export const initDb = async () => {
  await User.deleteMany({});
  for (let user of users) {
    await User.create(user);
  }
  console.log('Users collection populated');
  await UserType.deleteMany({});
  for (let userType of userTypes) {
    await UserType.create(userType);
  }
  console.log('UserTypes collection populated');
};

export default initDb;
