import express from 'express';
import { request } from '../controllers/request.js';

const router = express.Router();

/**
 * @openapi
 * api/v1/request:
 *   post:
 *     summary: Google authentication url
 *     description: Fetch the url to redirect to google sign in page
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
 *                   example: "https://accounts.google.com/o/oauth2/v2/auth?access..."
 */
router.post('/', request);

export default router;
