import express from 'express';
import  { createOrder, completeOrder } from '../controllers/paypal_serv.js';

const router = express.Router();
router.post('/pay', createOrder );
router.get('/complete-order', completeOrder);



export default router;