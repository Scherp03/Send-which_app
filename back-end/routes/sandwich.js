import express from 'express';
import { tokenChecker } from '../middleware/tokenChecker.js';
import { login, logout } from '../controllers/auth.js';
import {
  findBestSeller,
  calculateSandwichPrice,
} from '../controllers/sandwich.js';

const router = express.Router();

export default router;
