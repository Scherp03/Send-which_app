import express from 'express';
import { tokenChecker } from '../middleware/tokenChecker.js';
import { login, logout } from '../controllers/auth.js';

const router = express.Router();

/**
 * @openapi
 * api/v1/auth/login:
 *   post:
 *     summary: Authenticate user and return tokens
 *     description: Login to the application, and returns a bearer access token that is handled by the front end and used throughout every other request
 *     tags:
 *      - Authentication
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     requestBody:
 *       description: The request body is be a JSON object containing the token and the user's id.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user
 *                 example: myusername
 *               password:
 *                 type: string
 *                 description: The password of the user
 *                 example: mypassword
 *     responses:
 *       '200':
 *         description: The user has provided the correct email and password and is given tokens
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 AccessToken:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI7gH8Trdua..."
 *       '400':
 *         description: The user has inserted an invalid request, both email and password are required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid request. Email and password are required."
 *       '401':
 *         description: The user has inserted an invalid password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid password."
 *       '404':
 *         description: The user has inserted an invalid email
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Account not registered."
 *       '500':
 *         description: The server has had some problems during login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "An error occurred during login."
 */
router.post('/login', login);

router.delete('/logout', tokenChecker, logout);

export default router;
