import express from "express";
const router = express.Router();
import { getLocationsController,createLocationController,updateLocationController,deleteLocationController } from "../controllers/locationController.js";
/**
 * @swagger
 * components:
 *   schemas:
 *     Location:
 *       type: object
 *       required:
 *         - location_id
 *         - city
 *         - latitude
 *         - longitude
 *       properties:
 *         location_id:
 *           type: string
 *           description: The unique identifier of the location.
 *           example: "a79a45ed-0c36-436c-a4c5-9547f0975fef"
 *         city:
 *           type: string
 *           description: The name of the city for the location.
 *           example: "New York"
 *         latitude:
 *           type: number
 *           format: float
 *           description: The latitude of the location.
 *           example: 40.7128
 *         longitude:
 *           type: number
 *           format: float
 *           description: The longitude of the location.
 *           example: -74.0060
 */

/**
 * @swagger
 * /location/{id}:
 *   get:
 *     summary: Get a location by ID
 *     description: Fetch a location by its unique ID.
 *     tags: [Locations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the location to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Location retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Location'
 *       404:
 *         description: Location not found
 */
router.get('/:id', getLocationsController);
/**
 * @swagger
 * /location:
 *   post:
 *     summary: Create a new location
 *     description: Create a new location with the given details.
 *     tags: [Locations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Location'
 *     responses:
 *       201:
 *         description: Location created successfully
 *       400:
 *         description: Invalid input data
 */
router.post('/',createLocationController);
/**
 * @swagger
 * /location/{id}:
 *   put:
 *     summary: Update an existing location
 *     description: Update the details of a location by its ID.
 *     tags: [Locations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the location to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Location'
 *     responses:
 *       200:
 *         description: Location updated successfully
 *       400:
 *         description: Invalid input data
 *       404:
 *         description: Location not found
 */
router.put('/:id', updateLocationController);
/**
 * @swagger
 * /location/{id}:
 *   delete:
 *     summary: Delete a location by ID
 *     description: Delete a location based on its unique ID.
 *     tags: [Locations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the location to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Location deleted successfully
 *       404:
 *         description: Location not found
 */
router.delete('/:id', deleteLocationController);


export default router;