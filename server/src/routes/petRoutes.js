const express = require("express");
const router = express.Router();
const petController = require("../controllers/petController");

// TODO: Add authentication middleware once implemented
// const authMiddleware = require("../middleware/auth");

/**
 * @swagger
 * tags:
 *   name: Pets
 *   description: Pet management API endpoints
 */

// GET all pets
router.get("/", petController.getAllPets);

// GET a specific pet by ID
router.get("/:id", petController.getPet, petController.getPetById);

/**
 * @swagger
 * /pets:
 *   post:
 *     summary: Create a new pet
 *     tags: [Pets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pet'
 *     responses:
 *       201:
 *         description: Pet created successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post(
  "/",
  // authMiddleware.requireAuth, // Uncomment when auth is implemented
  petController.createPet
);

// Update a pet
// Note: Consider adding validation middleware
router.put("/:id", petController.getPet, petController.updatePet);

// Delete a pet - requires admin privileges
router.delete(
  "/:id",
  petController.getPet,
  // authMiddleware.requireAdmin, // TODO: Implement admin check
  petController.deletePet
);

// TODO: Add endpoint for pet image upload

module.exports = router;
