import express from 'express';

import { populateSlots, getSlots, getSlot } from '../controllers/slot.js';

const router = express.Router();

/**
 * @openapi
 * /slots/populate:
 *   post:
 *     summary: Populate time slots
 *     description: "Create and populate time slots based on the provided opening time, closing time, slot duration, and maximum number of sandwiches per slot."
 *     tags:
 *       - Slots
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     requestBody:
 *       description: "The request body is a JSON object containing the opening time, closing time, slot duration, and maximum number of sandwiches per slot."
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
 *                 type: Date
 *                 description: "The opening date."
 *                 example: 2024-01-01T11:30:00
 *               closingTime:
 *                 type: Date
 *                 description: "The closing time in date format."
 *                 example: 2024-01-01T11:30:00
 *               slotDuration:
 *                 type: number
 *                 description: "The duration of each slot in date format."
 *                 example: 2024-01-01T11:30:00
 *               maxSandwiches:
 *                 type: number
 *                 description: "The maximum number of sandwiches per slot."
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
 *                       hours:
 *                         type: number
 *                         description: "The hour at wich the slot starts ."
 *                         example: 12
 *                       minutes:
 *                         type: number
 *                         description: "The minutes at wich the slot starts ."
 *                         example: 15
 *                       maxSandwiches:
 *                         type: number
 *                         description: "The maximum number of sandwiches for the slot."
 *                         example: 10
 *                       duration:
 *                         type: number
 *                         description: "The duration of the slot in minutes."
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

/**
 * @openapi
 * /slots/{id}:
 *   get:
 *     summary: Retrieve a slot by ID
 *     description: Get the details of a specific slot using its ID.
 *     tags:
 *       - Slots
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the slot to retrieve.
 *         example: "60b8d295f1b2c342c8f0d2e4"
 *     responses:
 *       '200':
 *         description: "OK: Slot found and details returned."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 time:
 *                   type: string
 *                   description: The time of the slot formatted as HH:mm.
 *                   example: "08:00"
 *       '404':
 *         description: "Not Found: Slot not found."
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
 *                   example: "Slot not found"
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
 *                   example: "Internal server error"
 */

router.get('/:id', getSlot);

export default router;
