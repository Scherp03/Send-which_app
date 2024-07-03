import express from 'express';
import { tokenChecker } from '../middleware/tokenChecker.js';
import { login, logout } from '../controllers/auth.js';

const router = express.Router();

/**
 * @openapi
 * api/v1/auth/login:
 *   post:
 *     summary: Authenticate user and return token
 *     description: Login to the application and return a bearer access token that is handled by the front end and will be used throughout every other request.
 *     tags:
 *       - Authentication
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     requestBody:
 *       description: The request body is a JSON object containing the user's username and password.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user.
 *                 example: "myusername"
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *                 example: "mysuperdupersecretPassword"
 *     responses:
 *       '200':
 *         description: "OK: The user has provided the correct username and password, thus a token is returned."
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
 *                   example: "Welcome to your account, <username>!"
 *                 token:
 *                   type: string
 *                   example: "2e739d8ab455f8cb78eaf4c..."
 *       '400':
 *         description: "Bad Request: The user has not filled all fields."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: bool
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Missing some parameters"
 *       '401':
 *         description: "Unauthorized: The user has entered an invalid password."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: bool
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Wrong password!"
 *       '404':
 *         description: "Not Found: The user has entered an invalid username."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: bool
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Cannot find user <username> in our database"
 *       '500':
 *         description: "Internal Server Error: The server encountered an unexpected condition that prevented it from fulfilling the request."
 */
router.post('/login', login);

/**
 * @openapi
 * api/v1/auth/logout:
 *   delete:
 *     summary: Logout from the application
 *     description: By doing the logout, the token gets discarded by the frontend
 *     tags:
 *       - Authentication
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           example: Bearer <token>
 *         description: "JWT token obtained during login."
 *     responses:
 *       '200':
 *         description: "OK: The user has provided the correct username and password, thus a token is returned."
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
 *                   example: "User <username> logged out successfully!"
 *       '403':
 *         description: "Not Found: The user has entered an invalid username."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: bool
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "No permissions"
 *       '500':
 *         description: "Internal Server Error: The server encountered an unexpected condition that prevented it from fulfilling the request."
 */
router.delete('/logout', tokenChecker, logout);

export default router;
