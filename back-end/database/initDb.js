import User from './schemas/user.js';
import UserType from './schemas/userType.js';
import Ingredient from './schemas/ingredient.js';
import { Permissions, Roles } from '../../shared/userTypeDefinitions.js';
import bcrypt from 'bcryptjs';

export const initDb = async () => {
  // create crypted password
  const mockHashedPassword = await bcrypt.hash('mockpswd', 10);
  const LucaHashedPassword = await bcrypt.hash('lessgoski03', 10);

  /* initialize all collections */

  // define all permissions
  const userPerm = [Permissions.VIEWER];
  const adminPerm = [Permissions.VIEWER, Permissions.EDITOR];

  const userTypes = [
    { role: Roles.USER, permissions: userPerm },
    { role: Roles.ADMIN, permissions: adminPerm },
  ];

  // initialize users
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

  // initialize ingredients
  const ingredients = [
    {
      name: 'Tomato',
      description: 'Added by Luca',
      price: '0.50',
      quantity: '100',
    },
    {
      name: 'Salad',
      description: 'Added by Luca',
      price: '0.50',
      quantity: '100',
    },
    {
      name: 'Ham',
      description: 'Added by Luca',
      price: '0.50',
      quantity: '100',
    },
    {
      name: 'Mozzarella',
      description: 'Added by Luca',
      price: '0.50',
      quantity: '100',
    },
    {
      name: 'Turkey',
      description: 'Added by Luca',
      price: '0.50',
      quantity: '100',
    },
    {
      name: 'Cheese',
      description: 'Added by Luca',
      price: '0.50',
      quantity: '100',
    },
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
  await Ingredient.deleteMany({});
  for (let ingredient of ingredients) {
    await Ingredient.create(ingredient);
  }
  console.log('Ingredient collection populated');
};

export default initDb;
