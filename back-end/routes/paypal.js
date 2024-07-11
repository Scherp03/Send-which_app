import express from 'express';
import  { createOrder, capturePayment } from '../paypal/services/paypal_serv.js';

const router = express.Router();
router.post('/pay', createOrder );
router.get('/complete-order', capturePayment);


export default router