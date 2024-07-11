import express from 'express';
import { oauth } from '../controllers/oauth.js';

const router = express.Router();

/* This must never be called manually */
router.get('/', oauth);

export default router;
