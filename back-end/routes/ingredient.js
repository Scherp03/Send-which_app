import express from 'express';

import {
  addIngredient,
  setAvailability,
  increaseAvailability,
  deleteIngredient,
  restoreDeleted,
  getIngredients,
  getIngredient,
} from '../controllers/ingredient.js';

const router = express.Router();

router.get('/', getIngredients);

router.get('/:id', getIngredient);

router.post('/add', addIngredient);

router.put('/setavailability', setAvailability);

router.put('/increaseavailability', increaseAvailability);

router.delete('/delete', deleteIngredient);

router.put('/restoredeleted', restoreDeleted);

export default router;
