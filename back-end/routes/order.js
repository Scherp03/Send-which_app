import express from 'express';
import { createOrder,viewAllOrders,viewOrder, viewToDo } from '../controllers/order.js';

const router = express.Router();
router.post('/create', createOrder);
router.get('/view/:id', viewOrder);
router.get('/viewAll', viewAllOrders);
router.get('/viewToDo', viewToDo);


export default router;