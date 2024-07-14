import express from 'express';

import {
  addIngredient,
  setAvailability,
  increaseAvailability,
  deleteIngredient,
  restoreDeleted,
  getIngredients,
  getIngredient,
} from '../controllers/ingredient.js';

const router = express.Router();

/**
 * @openapi
 * /ingredients:
 *   get:
 *     summary: Retrieve all active ingredients
 *     description: Get a list of all active ingredients.
 *     tags:
 *       - Ingredients
 *     produces:
 *       - application/json
 *     responses:
 *       '200':
 *         description: "OK: List of active ingredients returned."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 ingredients:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "60b8d295f1b2c342c8f0d2e4"
 *                       name:
 *                         type: string
 *                         example: "Tomato"
 *                       description:
 *                         type: string
 *                         example: "Fresh red tomato"
 *                       price:
 *                         type: number
 *                         example: 1.5
 *                       quantity:
 *                         type: number
 *                         example: 100
 *                       tags:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["vegetable", "fruit"]
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
router.get('/', getIngredients);

/**
 * @openapi
 * /ingredients/{id}:
 *   get:
 *     summary: Retrieve an ingredient by ID
 *     description: Get the details of a specific ingredient using its ID.
 *     tags:
 *       - Ingredients
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the ingredient to retrieve.
 *         example: "60b8d295f1b2c342c8f0d2e4"
 *     responses:
 *       '200':
 *         description: "OK: Ingredient found and details returned."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 ingredient:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "60b8d295f1b2c342c8f0d2e4"
 *                     name:
 *                       type: string
 *                       example: "Tomato"
 *                     description:
 *                       type: string
 *                       example: "Fresh red tomato"
 *                     price:
 *                       type: number
 *                       example: 1.5
 *                     quantity:
 *                       type: number
 *                       example: 100
 *                     tags:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["vegetable", "fruit"]
 *       '404':
 *         description: "Not Found: Ingredient not found."
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
 *                   example: "Ingredient not found"
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
router.get('/:id', getIngredient);

/**
 * @openapi
 * /ingredients:
 *   post:
 *     summary: Add a new ingredient
 *     description: Add a new ingredient with a unique name, valid price, and quantity.
 *     tags:
 *       - Ingredients
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     requestBody:
 *       description: The request body is a JSON object containing the ingredient's details.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - quantity
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the ingredient.
 *                 example: "Tomato"
 *               description:
 *                 type: string
 *                 description: A brief description of the ingredient.
 *                 example: "Fresh red tomato"
 *               price:
 *                 type: number
 *                 description: The price of the ingredient.
 *                 example: 1.5
 *               quantity:
 *                 type: number
 *                 description: The quantity of the ingredient.
 *                 example: 100
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Tags associated with the ingredient.
 *                 example: ["vegetable", "fruit"]
 *     responses:
 *       '201':
 *         description: "Created: Ingredient successfully added."
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
 *                   example: "Ingredient added"
 *       '400':
 *         description: "Bad Request: Invalid input or duplicate ingredient."
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
 *                   example: "Duplicate ingredient"
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
router.post('/add', addIngredient);

/**
 * @openapi
 * /ingredients/availability:
 *   post:
 *     summary: Set the availability of an ingredient
 *     description: Set the availability quantity for a specific ingredient.
 *     tags:
 *       - Ingredients
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     requestBody:
 *       description: The request body is a JSON object containing the ingredient ID and the new availability quantity.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - _id
 *               - availability
 *             properties:
 *               _id:
 *                 type: string
 *                 description: The ID of the ingredient.
 *                 example: "60b8d295f1b2c342c8f0d2e4"
 *               availability:
 *                 type: number
 *                 description: The new availability quantity.
 *                 example: 150
 *     responses:
 *       '200':
 *         description: "OK: Availability updated successfully."
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
 *                   example: "Availability updated"
 *       '400':
 *         description: "Bad Request: Invalid quantity provided."
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
 *                   example: "Quantity is not valid"
 *       '404':
 *         description: "Not Found: Ingredient not found."
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
 *                   example: "Ingredient not found"
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
router.put('/setavailability', setAvailability);

/**
 * @openapi
 * /ingredients/increase-availability:
 *   post:
 *     summary: Increase the availability of an ingredient
 *     description: Increase the availability quantity for a specific ingredient.
 *     tags:
 *       - Ingredients
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     requestBody:
 *       description: The request body is a JSON object containing the ingredient ID and the quantity to be added.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - _id
 *               - availability
 *             properties:
 *               _id:
 *                 type: string
 *                 description: The ID of the ingredient.
 *                 example: "60b8d295f1b2c342c8f0d2e4"
 *               availability:
 *                 type: number
 *                 description: The quantity to be added.
 *                 example: 50
 *     responses:
 *       '200':
 *         description: "OK: Availability updated successfully."
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
 *                   example: "Availability updated"
 *       '400':
 *         description: "Bad Request: Invalid quantity provided."
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
 *                   example: "Quantity is not valid"
 *       '404':
 *         description: "Not Found: Ingredient not found."
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
 *                   example: "Ingredient not found"
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
router.put('/increaseavailability', increaseAvailability);

/**
 * @openapi
 * /ingredients:
 *   delete:
 *     summary: Delete an ingredient
 *     description: Delete a specific ingredient by its ID.
 *     tags:
 *       - Ingredients
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     requestBody:
 *       description: The request body is a JSON object containing the ingredient ID.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - _id
 *             properties:
 *               _id:
 *                 type: string
 *                 description: The ID of the ingredient to be deleted.
 *                 example: "60b8d295f1b2c342c8f0d2e4"
 *     responses:
 *       '200':
 *         description: "OK: Ingredient deleted successfully."
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
 *                   example: "Ingredient deleted"
 *       '404':
 *         description: "Not Found: Ingredient not found."
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
 *                   example: "Ingredient not found"
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
 *                   example: "Failed to delete ingredient"
 */
router.delete('/delete', deleteIngredient);

/**
 * @openapi
 * /ingredients/restore:
 *   post:
 *     summary: Restore a deleted ingredient
 *     description: Restore an ingredient that was previously deleted, making it active again.
 *     tags:
 *       - Ingredients
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     requestBody:
 *       description: The request body is a JSON object containing the name of the ingredient to be restored.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the ingredient to be restored.
 *                 example: "Tomato"
 *     responses:
 *       '200':
 *         description: "OK: Ingredient restored successfully."
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
 *                   example: "Ingredient restored"
 *       '400':
 *         description: "Bad Request: Ingredient is already active."
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
 *                   example: "Ingredient already active"
 *       '404':
 *         description: "Not Found: Ingredient not found."
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
 *                   example: "Ingredient not found"
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
router.put('/restoredeleted', restoreDeleted);

export default router;
