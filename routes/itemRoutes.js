import express from "express";
const router = express.Router();
import {
  createItemController,
  getItemController,
  updateItemController,
  deleteItemController,
  filterItemsController,
  getTrendingItemsController,
} from "../controllers/itemController.js";
import authenticateToken from "../middleware/authenticateToken.js";
/**
 * @swagger
 * components:
 *   schemas:
 *     Item:
 *       type: object
 *       properties:
 *         item_id:
 *           type: string
 *           example: "0d499409-2cba-40cf-8aaa-34bad5770b8d"
 *         owner_id:
 *           type: string
 *           example: "2"
 *         title:
 *           type: string
 *           example: "Luxury Apartment"
 *         description:
 *           type: string
 *           example: "A beautiful luxury apartment in the city center."
 *         category_id:
 *           type: string
 *           example: "0d499409-2cba-40cf-8aaa-34bad5770b8c"
 *         price_per_day:
 *           type: number
 *           format: float
 *           example: 150.00
 *         deposit:
 *           type: number
 *           format: float
 *           example: 300.00
 *         location_id:
 *           type: integer
 *           example: 1
 *         status:
 *           type: string
 *           example: "available"
 *         damage_protection_required:
 *           type: integer
 *           example: 1
 *         rating:
 *           type: number
 *           format: float
 *           example: 4.5
 */

/**
 * @swagger
 * /items/filter:
 *   get:
 *     summary: Filter items based on multiple criteria
 *     description: Retrieves a list of items filtered by category, location, price range, and availability. Returns the closest item to the specified location using distance calculations. Requires authentication.
 *     tags:
 *       - Items
 *     security:
 *       - bearerAuth: []  # Requires a bearer token for authorization
 *     parameters:
 *       - name: category_id
 *         in: query
 *         description: The ID of the category to filter by
 *         required: false
 *         type: string
 *         example: "0d499409-2cba-40cf-8aaa-34bad5770b8c"
 *       - name: location_id
 *         in: query
 *         description: The ID of the location to filter items by
 *         required: true
 *         type: integer
 *         example: 1
 *       - name: price_min
 *         in: query
 *         description: The minimum price for the items
 *         required: false
 *         type: number
 *         format: float
 *         example: 100.00
 *       - name: price_max
 *         in: query
 *         description: The maximum price for the items
 *         required: false
 *         type: number
 *         format: float
 *         example: 500.00
 *       - name: availability
 *         in: query
 *         description: The availability status of the items
 *         required: false
 *         type: string
 *         example: "available"
 *     responses:
 *       200:
 *         description: Successfully filtered items and closest item information.
 *         content:
 *           application/json:
 *             examples:
 *               example1:
 *                 value:
 *                   items: 
 *                     - item_id: "0d499409-2cba-40cf-8aaa-34bad5770b8d"
 *                       title: "Luxury Apartment"
 *                       description: "A beautiful luxury apartment in the city center."
 *                       category_id: "0d499409-2cba-40cf-8aaa-34bad5770b8c"
 *                       price_per_day: 150.00
 *                       deposit: 300.00
 *                       location_id: 1
 *                       status: "available"
 *                       damage_protection_required: 1
 *                       rating: 4.5
 *                   closestItem:
 *                     item_id: "0d499409-2cba-40cf-8aaa-34bad5770b8d"
 *                     title: "Luxury Apartment"
 *                     description: "A beautiful luxury apartment in the city center."
 *                     category_id: "0d499409-2cba-40cf-8aaa-34bad5770b8c"
 *                     price_per_day: 150.00
 *                     deposit: 300.00
 *                     location_id: 1
 *                     status: "available"
 *                     damage_protection_required: 1
 *                     rating: 4.5
 *       400:
 *         description: Invalid filter parameters
 *         content:
 *           application/json:
 *             examples:
 *               example1:
 *                 value:
 *                   message: "Invalid filter parameters"
 *       404:
 *         description: Location not found
 *         content:
 *           application/json:
 *             examples:
 *               example1:
 *                 value:
 *                   message: "Location not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             examples:
 *               example1:
 *                 value:
 *                   message: "An error occurred"
 */
router.get("/filter",authenticateToken, filterItemsController);
/**
* @swagger
* /items/trending:
*   get:
*     summary: Get trending items
*     description: Retrieve a list of trending items that are available, ordered by rating in descending order. Requires authentication.
*     tags:
*       - Items
*     security:
*       - bearerAuth: []  # Requires a bearer token for authorization
*     responses:
*       200:
*         description: Successfully retrieved trending items
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Item'  # Reference to the Item schema
*             example:
*               - item_id: "0d499409-2cba-40cf-8aaa-34bad5770b8d"
*                 owner_id: "2"
*                 title: "Luxury Apartment"
*                 description: "A beautiful luxury apartment in the city center."
*                 category_id: "0d499409-2cba-40cf-8aaa-34bad5770b8c"
*                 price_per_day: 150.00
*                 deposit: 300.00
*                 location_id: 1
*                 status: "available"
*                 damage_protection_required: 1
*                 rating: 4.5
*       500:
*         description: Error fetching trending items
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                   example: "Error fetching trending items"
*/
router.get("/trending",authenticateToken, getTrendingItemsController);
/**
 * @swagger
 * /items/{id}:
 *   get:
 *     summary: Get a single item by ID
 *     description: Retrieve the details of an item based on its unique ID. Requires authentication.
 *     tags:
 *       - Items
 *     security:
 *       - bearerAuth: []  # Requires a bearer token for authorization
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique ID of the item
 *         schema:
 *           type: string
 *           example: "0d499409-2cba-40cf-8aaa-34bad5770b8d"
 *     responses:
 *       200:
 *         description: Successfully retrieved item details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'  # Reference to the Item schema
 *             example:
 *               item_id: "0d499409-2cba-40cf-8aaa-34bad5770b8d"
 *               owner_id: "2"
 *               title: "Luxury Apartment"
 *               description: "A beautiful luxury apartment in the city center."
 *               category_id: "0d499409-2cba-40cf-8aaa-34bad5770b8c"
 *               price_per_day: 150.00
 *               deposit: 300.00
 *               location_id: 1
 *               status: "available"
 *               damage_protection_required: 1
 *               rating: 4.5
 *       404:
 *         description: Item not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Item not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error retrieving item"
 */
router.get("/:id",authenticateToken, getItemController);
/**
 * @swagger
 * /items:
 *   post:
 *     summary: Create a new item
 *     description: Allows the creation of a new item. Only accessible to users with the role "Owner". Requires authentication.
 *     tags:
 *       - Items
 *     security:
 *       - bearerAuth: []  # Requires a bearer token for authorization
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Item'
 *     responses:
 *       201:
 *         description: Successfully created item
 *         content:
 *           application/json:
 *             schema:
 *   
 *            
 *       403:
 *         description: Forbidden access - Only owners can create items
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Forbidden Access"
 *       400:
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error message describing what went wrong"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error processing the request"
 */
router.post("/",authenticateToken, createItemController);
/**
 * @swagger
 * /items/{id}:
 *   put:
 *     summary: Update an existing item
 *     description: Allows the update of an existing item. Only accessible to users with the role "Owner". Requires authentication.
 *     tags:
 *       - Items
 *     security:
 *       - bearerAuth: []  # Requires a bearer token for authorization
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the item to be updated
 *         schema:
 *           type: string
 *           example: "0d499409-2cba-40cf-8aaa-34bad5770b8d"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Item'
 *     responses:
 *       200:
 *         description: Successfully updated item
 *         content:
 *           application/json:
 *             schema:
 *               
 *       403:
 *         description: Forbidden access - Only owners can update items
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Forbidden Access"
 *       400:
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error message describing what went wrong"
 *       404:
 *         description: Item not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Item not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error processing the request"
 */

router.put("/:id",authenticateToken, updateItemController);
/**
 * @swagger
 * /items/{id}:
 *   delete:
 *     summary: Delete an item (mark as rented)
 *     description: Allows the deletion of an item by marking it as "rented". Only accessible to users with the role "Owner". Requires authentication.
 *     tags:
 *       - Items
 *     security:
 *       - bearerAuth: []  # Requires a bearer token for authorization
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the item to be deleted
 *         schema:
 *           type: string
 *           example: "0d499409-2cba-40cf-8aaa-34bad5770b8d"
 *     responses:
 *       200:
 *         description: Successfully deleted the item (marked as rented)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Item deleted successfully"
 *       403:
 *         description: Forbidden access - Only owners can delete items
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Forbidden Access"
 *       400:
 *         description: Error with request processing
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error message describing what went wrong"
 *       404:
 *         description: Item not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Item not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error processing the request"
 */
router.delete("/:id", authenticateToken,deleteItemController);  

export default router;
