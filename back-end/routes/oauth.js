import express from 'express';
import { oauth } from '../controllers/oauth.js';

const router = express.Router();

/* GET home page. */
router.get('/', oauth);

export default router;
