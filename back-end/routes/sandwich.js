import express from 'express';

import {
  createSandwich,
  getAllSandwiches,
  getSandwich,
} from '../controllers/sandwich.js';

const router = express.Router();

/**
 * @openapi
 * api/v1/sandwich:
 *   post:
 *     summary: Sandwich creation
 *     description: Create a sandwich selecting ingredients
 *     tags:
 *       - Sandwich Management
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     requestBody:
 *       description: The request body is a JSON object containing the ingredients and brad type.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - bradType
 *               - ingredientsID
 *             properties:
 *               breadType:
 *                 type: string
 *                 description: The type of the bread.
 *                 example: "White"
 *               ingredientsID:
 *                 type: [mongoose.Schema.Types.ObjectId]
 *                 description: An array containing ingredients ID
 *                 example: "[669165bcbffb957424a532d2, 669165bcbffb957424a532d4]"
 *     responses:
 *       '200':
 *         description: "OK: The sandwich has been created successfully."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: bool
 *                   example: true
 *                 sandwichID:
 *                   type: ObjectId
 *                   example: "669165bcbffb957424a532d2"
 *                 sandwichIngredientsID:
 *                   type: [ObjectId]
 *                   example: "669165bcbffb957424a532d2"
 *                 sandwichPrice:
 *                   type: Number
 *                   example: "3"
 *       '503':
 *         description: "The sandwich was not created"
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
 *                   example: "Something went wrong while creating the sandwich"
 *       '500':
 *         description: "Internal Server Error: The server encountered an unexpected condition that prevented it from fulfilling the request."
 */
router.post('/', createSandwich);

/**
 * @openapi
 * api/v1/sandwich/:id:
 *   get:
 *     summary: Fetch sandwich info
 *     description: Fetch all data of the sandwich
 *     tags:
 *       - Sandwich Management
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     responses:
 *       '200':
 *         description: "OK: Sandwitch data is returned."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: bool
 *                   example: true
 *                 sandwichID:
 *                   type: ObjectId
 *                   example: "669165bcbffb957424a532d2"
 *                 sandwichIngredientsID:
 *                   type: [ObjectId]
 *                   example: "669165bcbffb957424a532d2"
 *                 sandwichPrice:
 *                   type: Number
 *                   example: "3"
 *       '404':
 *         description: "Not Found: The sandwich was not found in the database."
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
 *                   example: "fetch failed"
 *       '500':
 *         description: "Internal Server Error: The server encountered an unexpected condition that prevented it from fulfilling the request."
 */
router.get('/:id', getSandwich);

/**
 * @openapi
 * api/v1/sandwich:
 *   get:
 *     summary: Fetch all sandwiches
 *     description: Fetch all data of all the sandwiches
 *     tags:
 *       - Sandwich Management
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     responses:
 *       '200':
 *         description: "OK: Sandwitches are returned."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: bool
 *                   example: true
 *                 sandwichIngredientsID:
 *                   type: [ObjectId]
 *                   example: "[{_id: new ObjectId(6691ad83afe4e4a000518667), breadType: Integral, ingredientsID: [new ObjectId(6691ad83afe4e4a000518664)], price: 5, __v: 0}]"
 *       '404':
 *         description: "Not Found: There are no sandwiches in the database."
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
 *                   example: "No sandwich was found in the database"
 *       '500':
 *         description: "Internal Server Error: The server encountered an unexpected condition that prevented it from fulfilling the request."
 */
router.get('/', getAllSandwiches);

export default router;
