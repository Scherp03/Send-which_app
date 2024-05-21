import express from 'express';

import { tokenChecker } from '../middleware/tokenCheker.js';

import { createUser, getVerifiedUser, } from '../controllers/user.js';

const router = express.Router();

router.post('/', createUser);

router.get('/', tokenChecker, getVerifiedUser);

export default router;