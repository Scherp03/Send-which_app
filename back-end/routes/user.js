import express from 'express';

import { tokenChecker } from '../middleware/tokenChecker.js';

import {
  createUser,
  getUser,
  updateUser,
  deleteUser,
} from '../controllers/user.js';

const router = express.Router();

/**
 * @openapi
 * api/v1/users:
 *   post:
 *     summary: Account creation
 *     description: Create a user account by providing all personal data
 *     tags:
 *       - User Registration and Account Management
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     requestBody:
 *       description: The request body is a JSON object containing all new user data.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - username
 *               - email
 *               - password
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: The username of the user.
 *                 example: "John"
 *               lastName:
 *                 type: string
 *                 description: The username of the user.
 *                 example: "Doe"
 *               username:
 *                 type: string
 *                 description: The username of the user.
 *                 example: "myusername"
 *               email:
 *                 type: string
 *                 description: The username of the user.
 *                 example: "someone@email.net"
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *                 example: "mysuperdupersecretPassword"
 *     responses:
 *       '200':
 *         description: "OK: The user has correctly provided all the necessary data."
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
 *                   example: "User modified successfully!"
 *       '400':
 *         description: "Bad Request: The guest user has not filled all fields."
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
 *                   example: "No data modified"
 *       '401':
 *         description: "Unauthorized: The user has entered either a username or email already in use."
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
 *                   example: "Username <username> already in use or Email <someone@email.net> already in use"
 *       '404':
 *         description: "Bad Request: the current user has not been found"
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
 *                   example: "User not found"
 *       '500':
 *         description: "Internal Server Error: The server encountered an unexpected condition that prevented it from fulfilling the request."
 */
router.post('/', createUser);

/**
 * @openapi
 * api/v1/users/:id:
 *   get:
 *     summary: Fetch account data
 *     description: Fetch all data of the account
 *     tags:
 *       - User Registration and Account Management
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
 *         description: "OK: Account data is returned."
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
 *                   example: "User modified successfully"
 *       '403':
 *         description: "Not Found: The user does not have the needed rights"
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
 *       '404':
 *         description: "Not Found: The user doing request was not found in the database."
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
 *                   example: "User not found"
 *       '500':
 *         description: "Internal Server Error: The server encountered an unexpected condition that prevented it from fulfilling the request."
 */
router.get('/:id', tokenChecker, getUser);

/**
 * @openapi
 * api/v1/users/:id:
 *   patch:
 *     summary: Account modification
 *     description: Modify the desired data of the account
 *     tags:
 *       - User Registration and Account Management
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
 *     requestBody:
 *       description: The request body is a JSON object containing the data that the user wants to modify.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - username
 *               - email
 *               - password
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: The username of the user.
 *                 example: "John"
 *               lastName:
 *                 type: string
 *                 description: The username of the user.
 *                 example: "Doe"
 *               username:
 *                 type: string
 *                 description: The username of the user.
 *                 example: "mynewusername"
 *               email:
 *                 type: string
 *                 description: The username of the user.
 *                 example: "someone@email.net"
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *                 example: "mynewsuperdupersecretPassword"
 *     responses:
 *       '200':
 *         description: "OK: The user has provided data correctly and the account has been modified."
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
 *                   example: "User modified successfully"
 *       '400':
 *         description: "Bad Request: The user has not provided any new data."
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
 *                   example: "No data modified"
 *       '401':
 *         description: "Unauthorized: The user has entered either a username or email already in use."
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
 *                   example: "Username <username> already in use or Email <someone@email.net> already in use"
 *       '403':
 *         description: "Not Found: The user does not have the needed rights"
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
 *       '404':
 *         description: "Not Found: The user doing the request was not found in the database."
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
 *                   example: "User not found"
 *       '500':
 *         description: "Internal Server Error: The server encountered an unexpected condition that prevented it from fulfilling the request."
 */
router.patch('/:id', tokenChecker, updateUser);

/**
 * @openapi
 * api/v1/users/:id:
 *   delete:
 *     summary: Account deletion
 *     description: The current account is permanently deleted
 *     tags:
 *       - User Registration and Account Management
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
 *         description: "OK: The account has been deleted."
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
 *                   example: "User <username> deleted successfully"
 *       '403':
 *         description: "Not Found: The user does not have the needed rights"
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
 *       '404':
 *         description: "Not Found: The user doing the request was not found in the database."
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
 *                   example: "User not found"
 *       '500':
 *         description: "Internal Server Error: The server encountered an unexpected condition that prevented it from fulfilling the request."
 */
router.delete('/:id', tokenChecker, deleteUser);

export default router;
