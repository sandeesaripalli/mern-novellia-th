/**
 * @swagger
 * components:
 *   schemas:
 *     Pet:
 *       type: object
 *       required:
 *         - name
 *         - type
 *         - owner
 *         - dateOfBirth
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the pet
 *         name:
 *           type: string
 *           description: The name of the pet
 *         type:
 *           type: string
 *           description: The type of the pet
 *         owner:
 *           type: string
 *           description: The owner of the pet
 *         dateOfBirth:
 *           type: string
 *           format: date
 *           description: The date of birth of the pet
 *         vaccines:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               dateAdministered:
 *                 type: string
 *                 format: date
 *         allergies:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               reactions:
 *                 type: string
 *               severity:
 *                 type: string
 *         imageUrl:
 *           type: string
 *           description: The image URL of the pet
 *       example:
 *         name: Buddy
 *         type: Dog
 *         owner: Alice
 *         dateOfBirth: 2019-01-01
 *         vaccines:
 *           - name: Rabies
 *             dateAdministered: 2019-03-15
 *         allergies:
 *           - name: Pollen
 *             reactions: Sneezing
 *             severity: Mild
 *         imageUrl: https://images.unsplash.com/photo-1517849845537-4d257902454a
 */

const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  owner: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  vaccines: [
    {
      name: String,
      dateAdministered: Date,
    },
  ],
  allergies: [
    {
      name: String,
      reactions: String,
      severity: String,
    },
  ],
  imageUrl: String,
});

module.exports = mongoose.model("Pet", petSchema);
