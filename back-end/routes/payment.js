import express from 'express';
import { capturePayment, cancelOrder } from '../controllers/payment.js';

const router = express.Router();

router.get('/', capturePayment);
router.get('/cancel-order', cancelOrder);

export default router;