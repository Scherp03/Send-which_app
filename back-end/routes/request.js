import express from 'express';
import { request } from '../controllers/request.js';

const router = express.Router();

/* GET users listing. */
router.post('/', request);

export default router;