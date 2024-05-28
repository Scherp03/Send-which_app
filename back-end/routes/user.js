import express from 'express';

import { tokenChecker } from '../middleware/tokenCheker.js';

import { createUser, getUser, updateUser, deleteUser } from '../controllers/user.js';

const router = express.Router();

router.post('/signup', createUser);

router.get('/:id', tokenChecker, getUser);

router.patch('/update/:id', tokenChecker, updateUser);

router.delete('/delete/:id', tokenChecker, deleteUser);

export default router;