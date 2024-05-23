import express from 'express';

import { tokenChecker } from '../middleware/tokenCheker.js';

import { createUser, getUser, updateUser, deleteUser } from '../controllers/user.js';

const router = express.Router();

router.post('/', createUser);

router.get('/', tokenChecker, getUser);

router.patch('/', tokenChecker, updateUser);

router.delete('/', tokenChecker, deleteUser);

export default router;