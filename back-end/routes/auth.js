import express from 'express';

import { authUser, getUser } from '../controllers/auth.js';
import { tokenChecker } from '../middleware/tokenCheker.js';

const router = express.Router();

router.post('/login', authUser)

router.get('/user', tokenChecker, getUser);

export default router;