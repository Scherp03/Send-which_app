import express from 'express';
import { tokenChecker } from '../middleware/tokenChecker.js';
import { login, logout } from '../controllers/auth.js';

import {
  addIngredient,
  setAvailability,
  increaseAvailability,
  deleteIngredient,
  restoreDeleted,
} from '../controllers/ingredient.js';

const router = express.Router();

router.get('/ingredients');

export default router;
