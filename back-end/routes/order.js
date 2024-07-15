import express from 'express';
import { createOrder,viewAllOrders,viewOrder, viewStatus, changeStatus } from '../controllers/order.js';

const router = express.Router();
router.post('/', createOrder);
router.get('/status/:status', viewStatus);
router.get('/:id', viewOrder);
router.get('/', viewAllOrders);
router.patch('/:id', changeStatus);


export default router;