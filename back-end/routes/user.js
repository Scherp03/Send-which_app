import express from 'express';

import { tokenChecker } from '../middleware/tokenChecker.js';

import {
  createUser,
  getUser,
  updateUser,
  deleteUser,
} from '../controllers/user.js';

const router = express.Router();

router.post('/', createUser);

router.get('/:id', tokenChecker, getUser);

router.patch('/:id', tokenChecker, updateUser);

router.delete('/:id', tokenChecker, deleteUser);

export default router;
