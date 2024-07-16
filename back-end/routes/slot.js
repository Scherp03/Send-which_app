import express from 'express';

import { populateSlots, getSlots, getSlot } from '../controllers/slot.js';

const router = express.Router();

/**
 * @openapi
 * /slots/populate:
 *   post:
 *     summary: Populate time slots
 *     description: Create and populate time slots based on the provided opening time, closing time, slot duration, and maximum number of sandwiches per slot.
 *     tags:
 *       - Slots
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     requestBody:
 *       description: The request body is a JSON object containing the opening time, closing time, slot duration, and maximum number of sandwiches per slot.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - openingTime
 *               - closingTime
 *               - slotDuration
 *               - maxSandwiches
 *             properties:
 *               openingTime:
 *                 type: number
 *                 description: The opening time in minutes since midnight.
 *                 example: 480
 *               closingTime:
 *                 type: number
 *                 description: The closing time in minutes since midnight.
 *                 example: 1080
 *               slotDuration:
 *                 type: number
 *                 description: The duration of each slot in minutes.
 *                 example: 30
 *               maxSandwiches:
 *                 type: number
 *                 description: The maximum number of sandwiches per slot.
 *                 example: 10
 *     responses:
 *       '201':
 *         description: "Created: Slots added successfully."
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
 *                   example: "Slots added"
 *       '400':
 *         description: "Bad Request: Invalid slot duration."
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
 *                   example: "Invalid slot duration"
 *       '500':
 *         description: "Internal Server Error: The server encountered an unexpected condition that prevented it from fulfilling the request."
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
 *                   example: "Internal server error"
 */
router.post('/', populateSlots);

/**
 * @openapi
 * /slots:
 *   get:
 *     summary: Retrieve all slots
 *     description: Get a list of all time slots.
 *     tags:
 *       - Slots
 *     produces:
 *       - application/json
 *     responses:
 *       '200':
 *         description: "OK: List of slots returned successfully."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 slots:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "60b8d295f1b2c342c8f0d2e4"
 *                       time:
 *                         type: number
 *                         description: The time of the slot in minutes since midnight.
 *                         example: 480
 *                       maxSandwiches:
 *                         type: number
 *                         description: The maximum number of sandwiches for the slot.
 *                         example: 10
 *                       duration:
 *                         type: number
 *                         description: The duration of the slot in minutes.
 *                         example: 30
 *       '404':
 *         description: "Not Found: No slots found."
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
 *                   example: "No slots found"
 *       '500':
 *         description: "Internal Server Error: The server encountered an unexpected condition that prevented it from fulfilling the request."
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
 *                   example: "Internal server error"
 */
router.get('/', getSlots);

router.get('/:id', getSlot);

export default router;
