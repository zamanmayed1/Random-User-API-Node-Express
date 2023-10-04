/**
 * Express Router Configuration for User Routes
 * @module routes/userRoutes
 */

const express = require("express");
const userController = require("../controllers/user.controllers");
const router = express.Router();

/**
 * @route GET /api/users/all
 * @description Get all users
 * @access Public
 */
router.route("/all").get(userController.getAllUser);

/**
 * @route GET /api/users/random
 * @description Get a random user
 * @access Public
 */
router.route("/random").get(userController.getARandomUser);

/**
 * @route POST /api/users/save
 * @description Save a random user
 * @access Public
 */
router.route("/save").post(userController.saveARandomUser);

/**
 * @route PATCH /api/users/update/:id
 * @description Update a random user by ID
 * @param {string} id - The ID of the user to update
 * @access Public
 */
router.route("/update/:id").patch(userController.UpdateARandomUser);

/**
 * @route PATCH /api/users/bulk-update
 * @description Bulk update users by IDs
 * @access Public
 */
router.route("/bulk-update").patch(userController.BulkUpdateRandomUser);

/**
 * @route DELETE /api/users/delete/:id
 * @description Delete a user by ID
 * @param {string} id - The ID of the user to delete
 * @access Public
 */
router.route("/delete/:id").delete(userController.deleteUserById);

module.exports = router;
