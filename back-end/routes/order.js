import express from 'express';
import {
  createOrder,
  viewAllOrders,
  viewOrder,
  viewStatus,
  changeStatus,
} from '../controllers/order.js';

const router = express.Router();
/**
 * @openapi
 * /orders:
 *   post:
 *     summary: Create a new order
 *     description: "Create a new order with the specified details and save it to the system."
 *     tags:
 *       - Orders
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     requestBody:
 *       description: "The request body is a JSON object containing the details of the order."
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userID
 *               - slotID
 *               - content
 *               - status
 *               - total
 *               - date
 *             properties:
 *               userID:
 *                 type: string
 *                 description: "The ID of the user placing the order."
 *                 example: "60c72b2f9b1e8c001f8e4b8d"
 *               slotID:
 *                 type: string
 *                 description: "The ID of the slot where the order is placed."
 *                 example: "60c72b2f9b1e8c001f8e4b8e"
 *               content:
 *                 type: string
 *                 description: "The content or details of the order."
 *                 example: "2 sandwiches, 1 drink"
 *               total:
 *                 type: number
 *                 format: float
 *                 description: "The total cost of the order."
 *                 example: 29.99
 *               status:
 *                 type: string
 *                 description: "The status of the order."
 *                 example: "toDo"
 *               date:
 *                 type: string
 *                 format: date
 *                 description: "The date when the order was placed."
 *                 example: "2024-07-15"
 *     responses:
 *       '200':
 *         description: "OK: The order has been successfully created."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 userID:
 *                   type: string
 *                   example: "60c72b2f9b1e8c001f8e4b8d"
 *       '400':
 *         description: "Bad Request: Missing required parameters or invalid data."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Missing some parameters"
 *       '401':
 *         description: "Unauthorized: User ID not found."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "UserID not found, something went wrong"
 *       '503':
 *         description: "Service Unavailable: Order creation failed."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Order not created, something went wrong"
 *       '500':
 *         description: "Internal Server Error: An unexpected condition prevented the request from being fulfilled."
 */
router.post('/', createOrder);
/**
 * @openapi
 * /orders/{id}:
 *   get:
 *     summary: View a specific order
 *     description: "Retrieve the details of a specific order by its ID."
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: "The ID of the order to retrieve."
 *     responses:
 *       '200':
 *         description: "OK: The details of the specified order."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 orderId:
 *                   type: string
 *                   example: "60c72b2f9b1e8c001f8e4b8d"
 *                 slotID:
 *                   type: string
 *                   example: "60c72b2f9b1e8c001f8e4b8e"
 *                 content:
 *                   type: string
 *                   example: "2 sandwiches, 1 drink"
 *                 total:
 *                   type: number
 *                   format: float
 *                   example: 29.99
 *                 status:
 *                   type: string
 *                   example: "toDo"
 *                 date:
 *                   type: string
 *                   format: date
 *                   example: "2024-07-15"
 *       '400':
 *         description: "Bad Request: The order ID is required but not provided."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Order ID is required"
 *       '404':
 *         description: "Not Found: The order with the specified ID does not exist."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Order not found"
 *       '500':
 *         description: "Internal Server Error: An unexpected condition prevented the request from being fulfilled."
 */
router.get('/:id', viewOrder);
/**
 * @openapi
 * /orders:
 *   get:
 *     summary: View all orders
 *     description: "Retrieve a list of all orders in the system."
 *     tags:
 *       - Orders
 *     responses:
 *       '200':
 *         description: "OK: A list of all orders in the system."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 orders:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       orderId:
 *                         type: string
 *                         example: "60c72b2f9b1e8c001f8e4b8d"
 *                       slotID:
 *                         type: string
 *                         example: "60c72b2f9b1e8c001f8e4b8e"
 *                       content:
 *                         type: string
 *                         example: "2 sandwiches, 1 drink"
 *                       total:
 *                         type: number
 *                         format: float
 *                         example: 29.99
 *                       status:
 *                         type: string
 *                         example: "toDo"
 *                       date:
 *                         type: string
 *                         format: date
 *                         example: "2024-07-15"
 *       '404':
 *         description: "Not Found: No orders found."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "No orders found"
 *       '500':
 *         description: "Internal Server Error: An unexpected condition prevented the request from being fulfilled."
 */
router.get('/', viewAllOrders);
/**
 * @openapi
 * /orders/status/{status}:
 *   get:
 *     summary: View orders by status
 *     description: "Retrieve a list of orders filtered by their status."
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: path
 *         name: status
 *         required: true
 *         schema:
 *           type: string
 *         description: "The status of the orders to retrieve."
 *     responses:
 *       '200':
 *         description: "OK: A list of orders with the specified status."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 orders:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       orderId:
 *                         type: string
 *                         example: "60c72b2f9b1e8c001f8e4b8d"
 *                       slotID:
 *                         type: string
 *                         example: "60c72b2f9b1e8c001f8e4b8e"
 *                       content:
 *                         type: string
 *                         example: "2 sandwiches, 1 drink"
 *                       total:
 *                         type: number
 *                         format: float
 *                         example: 29.99
 *                       status:
 *                         type: string
 *                         example: "toDo"
 *                       date:
 *                         type: string
 *                         format: date
 *                         example: "2024-07-15"
 *       '404':
 *         description: "Not Found: No orders with the specified status found."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Orders with status {status} not found"
 *       '500':
 *         description: "Internal Server Error: An unexpected condition prevented the request from being fulfilled."
 */
router.get('/status/:status', viewStatus);
/**
 * @openapi
 * /orders/{id}:
 *   patch:
 *     summary: Change the status of an order
 *     description: "Update the status of a specific order to 'completed'."
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: "The ID of the order to update."
 *     responses:
 *       '200':
 *         description: "OK: The order status has been updated to 'completed'."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Order status updated to completed"
 *                 orderId:
 *                   type: string
 *                   example: "60c72b2f9b1e8c001f8e4b8d"
 *                 slotID:
 *                   type: string
 *                   example: "60c72b2f9b1e8c001f8e4b8e"
 *                 content:
 *                   type: string
 *                   example: "2 sandwiches, 1 drink"
 *                 total:
 *                   type: number
 *                   format: float
 *                   example: 29.99
 *                 status:
 *                   type: string
 *                   example: "completed"
 *                 date:
 *                   type: string
 *                   format: date
 *                   example: "2024-07-15"
 *       '400':
 *         description: "Bad Request: The order ID is required but not provided."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Order ID is required"
 *       '401':
 *         description: "Unauthorized: The order status is already 'completed'."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Order already completed"
 *       '404':
 *         description: "Not Found: The order with the specified ID does not exist."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Order not found"
 *       '500':
 *         description: "Internal Server Error: An unexpected condition prevented the request from being fulfilled."
 */
router.patch('/:id', changeStatus);
/**
 * @openapi
 * /orders/{id}:
 *   patch:
 *     summary: Change the status of an order
 *     description: "Update the status of a specific order to 'completed'."
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: "The ID of the order to update."
 *     requestBody:
 *       description: "The request body is a JSON object containing the new status."
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 description: "The new status of the order."
 *                 example: "completed"
 *     responses:
 *       '200':
 *         description: "OK: The order status has been updated to 'completed'."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Order status updated to completed"
 *                 orderId:
 *                   type: string
 *                   example: "60c72b2f9b1e8c001f8e4b8d"
 *                 slotID:
 *                   type: string
 *                   example: "60c72b2f9b1e8c001f8e4b8e"
 *                 content:
 *                   type: string
 *                   example: "2 sandwiches, 1 drink"
 *                 total:
 *                   type: number
 *                   format: float
 *                   example: 29.99
 *                 status:
 *                   type: string
 *                   example: "completed"
 *                 date:
 *                   type: string
 *                   format: date
 *                   example: "2024-07-15"
 *       '400':
 *         description: "Bad Request: The order ID is required but not provided."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Order ID is required"
 *       '401':
 *         description: "Unauthorized: The order status is already 'completed'."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Order already completed"
 *       '404':
 *         description: "Not Found: The order with the specified ID does not exist."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Order not found"
 *       '500':
 *         description: "Internal Server Error: An unexpected condition prevented the request from being fulfilled."
 */

export default router;
