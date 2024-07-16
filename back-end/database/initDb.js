import User from './schemas/user.js';
import UserType from './schemas/userType.js';
import Ingredient from './schemas/ingredient.js';
import Sandwich from './schemas/sandwich.js';
import axios from 'axios';
import { Permissions, Roles } from '../../shared/userTypeDefinitions.js';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();

export const initDb = async () => {
  // create crypted password
  const userHashedPassword = await bcrypt.hash('User2024', 10);
  const adminHashedPassword = await bcrypt.hash('Admin2024', 10);

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
      email: 'mock.user@something.net',
      password: userHashedPassword,
      userType: Roles.USER,
    },
    {
      firstName: 'mockName',
      lastName: 'mockSurname',
      username: 'mockAdmin',
      email: 'mock.admin@something.net',
      password: adminHashedPassword,
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

  // istantiate slots
  await axios.post(`${process.env.BASE_URL}/api/v1/slots`, {
    openingTime: '2024-01-01T11:30:00',
    closingTime: '2024-01-01T14:15:00',
    slotDuration: '2024-01-01T00:15:00', // slow duration is 15 m
    maxSandwiches: 15,
  });

  await Sandwich.deleteMany({});

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