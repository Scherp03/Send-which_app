import express from 'express';
import { request } from '../controllers/request.js';

const router = express.Router();

/**
 * @openapi
 * api/v1/request:
 *   post:
 *     summary: Authenticate user using google API and return token
 *     description: Create a user and/or login to the app, and return a bearer access token that is handled by the front end and will be used throughout every other request.
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
 *         description: "OK: The user is created and/or logged in"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: bool
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Welcome <username>! Your current password is: <temporary-password>. Change it ASAP"
 *                 id:
 *                   type: string
 *                   example: "6685d4c38fc9b23899737227"
 *                 token:
 *                   type: string
 *                   example: "2e739d8ab455f8cb78eaf4c..."
 */
router.post('/', request);

export default router;
