import User from './schemas/user.js';
import UserType from './schemas/userType.js';
import { Permissions, Roles } from '../../shared/userTypeDefinitions.js';
import bcrypt from 'bcryptjs';

export const initDb = async () => {
  // create crypted password
  const mockHashedPassword = await bcrypt.hash('mockpswd', 10);
  const LucaHashedPassword = await bcrypt.hash('lessgoski03', 10);

  // initialize all collections
  const users = [
    {
      firstName: 'mockName',
      lastName: 'mockSurname',
      username: 'mockUsername',
      email: 'mockEmail@something',
      password: mockHashedPassword,
      userType: Roles.USER,
    },
    {
      firstName: 'Luca',
      lastName: 'Carpella',
      username: 'scherp03',
      email: 'luca.carpella@gmail.com',
      password: LucaHashedPassword,
      userType: Roles.ADMIN,
    },
  ];

  // define all permissions
  const userPerm = [Permissions.VIEWER];
  const adminPerm = [Permissions.VIEWER, Permissions.EDITOR];

  const userTypes = [
    { role: Roles.USER, permissions: userPerm },
    { role: Roles.ADMIN, permissions: adminPerm },
  ];

  // reset and populate the database
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
