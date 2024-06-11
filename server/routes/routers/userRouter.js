import express from "express";
import {
  getAllUsers,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
  getMyProfile,
  updateMyProfile,
  updateMyPassword,
  deleteMyProfile,
  uploadUserImage,
  resizeUserImage,
} from "../../controller/userController.js";
import { allowedTo, isAuth } from "../../middleware/auth.middleware.js";
import { USER_ROLES } from "../../constants/index.js";
import {
  getSingleUserValidator,
  updateMyProfileValidator,
  updateMyPasswordValidator,
  deleteSingleUserValidator,
  updateSingleUserValidator,
} from "../../validators/user.validator.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API for managing users
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         // Define properties of the User schema here
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a single user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: Details of the user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: User not found
 *   patch:
 *     summary: Update a single user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid input data
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: User not found
 *   delete:
 *     summary: Delete a single user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: User not found
 */

// LOGGED_USER_ROUTES
router.use(isAuth);
router
  .route("/my-profile")
  .get(getMyProfile, getSingleUserValidator, getSingleUser)
  .patch(
    updateMyProfileValidator,
    uploadUserImage,
    resizeUserImage,
    updateMyProfile
  )
  .delete(deleteMyProfile);
router.route("/my-password").patch(updateMyPasswordValidator, updateMyPassword);

// ADMIN_ROUTES
router.use(allowedTo(USER_ROLES.ADMIN));
router.route("/").get(getAllUsers);
router
  .route("/:id")
  .get(getSingleUserValidator, getSingleUser)
  .patch(
    updateSingleUserValidator,
    uploadUserImage,
    resizeUserImage,
    updateSingleUser
  )
  .delete(deleteSingleUserValidator, deleteSingleUser);

export default router;
