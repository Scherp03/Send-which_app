import express from 'express';
import { createOrder,viewAllOrders,viewOrder, viewToDo, changeStatus } from '../controllers/order.js';

const router = express.Router();
router.post('/create', createOrder);
router.get('/view/:id', viewOrder);
router.get('/viewAll', viewAllOrders);
router.get('/viewToDo', viewToDo);
router.patch('/change-status/:id', changeStatus);


export default router;