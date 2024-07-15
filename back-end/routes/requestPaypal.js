import express from 'express';
import { createOrder } from '../controllers/requestPaypal.js';

const router = express.Router();
/**
 * @openapi
 * api/v1/paypal:
 *   post:
 *     summary: PayPal Payment
 *     description: Fetch the url to redirect to paypal payment page
 *     tags:
 *       - Authentication
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     requestBody:
 *       description: NO request body
 *       required: false
 *     responses:
 *       '200':
 *         description: "OK: The url is received"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: bool
 *                   example: true
 *                 url:
 *                   type: string
 *                   example: "https://api-m.sandbox.paypal.com..."
 */
router.post('/pay', createOrder);

export default router;
