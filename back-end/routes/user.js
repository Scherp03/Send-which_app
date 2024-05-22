import express from 'express';

import { tokenChecker } from '../middleware/tokenCheker.js';

import { createUser, updateUser, deleteUser } from '../controllers/user.js';

const router = express.Router();

router.post('/', createUser);

// router.get('/', getUser);

router.patch('/', tokenChecker, updateUser);

router.delete('/', tokenChecker, deleteUser);

export default router;