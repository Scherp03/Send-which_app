import express from 'express';
import { tokenChecker } from '../middleware/tokenChecker.js';
import { login, logout } from '../controllers/auth.js';

import calculateOrderPrice from '../controllers/order.js';

const router = express.Router();

export default router;
