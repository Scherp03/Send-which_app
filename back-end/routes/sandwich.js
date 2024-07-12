import express from 'express';

import {
  createSandwich,
  getAllSandwiches,
  getSandwich,
} from '../controllers/sandwich.js';

const router = express.Router();

router.post('/', createSandwich);

router.get('/:id', getSandwich);

// router.get('/', getAllSandwiches);

export default router;
