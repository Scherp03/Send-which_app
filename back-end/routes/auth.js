import express from 'express';
import { tokenChecker } from '../middleware/tokenCheker.js';
import { login, logout } from '../controllers/auth.js';

const router = express.Router();

router.post('/login', login);

router.delete('/logout', tokenChecker, logout)

export default router;