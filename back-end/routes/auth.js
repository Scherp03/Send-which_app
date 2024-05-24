import express from 'express';
import { tokenChecker } from '../middleware/tokenCheker.js';
import { loginUser, logoutUser } from '../controllers/auth.js';

const router = express.Router();

router.post('/login', loginUser);

router.get('/logout', tokenChecker, logoutUser)

export default router;