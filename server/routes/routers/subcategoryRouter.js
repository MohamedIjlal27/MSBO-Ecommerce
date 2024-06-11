import express from "express";
import { allowedTo, isAuth } from "../../middleware/auth.middleware.js";
import { USER_ROLES } from "../../constants/index.js";

import {
  createSubcategory,
  getAllSubcategories,
  getSingleSubcategory,
  updateSingleSubcategory,
  deleteSingleSubcategory,
  filterObjectForNestedSubcategories,
  setCategoryToBody,
} from "../../controller/subcategoryController.js";
import {
  getSubCategoryValidator,
  createSubcategoryValidator,
  updateSubcategoryValidator,
  deleteSubcategoryValidator,
} from "../../validators/subcategory.validator.js";

// mergeParams: allow access req.params from other routes
const router = express.Router({ mergeParams: true });

/**
 * @swagger
 * tags:
 *   name: Subcategories
 *   description: API for managing subcategories
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Subcategory:
 *       type: object
 *       properties:
 *         // Define properties of the Subcategory schema here
 */

/**
 * @swagger
 * /subcategories:
 *   get:
 *     summary: Get all subcategories
 *     tags: [Subcategories]
 *     responses:
 *       200:
 *         description: List of all subcategories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Subcategory'
 *   post:
 *     summary: Create a new subcategory
 *     tags: [Subcategories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Subcategory'
 *     responses:
 *       200:
 *         description: New subcategory created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Subcategory'
 */

/**
 * @swagger
 * /subcategories/{id}:
 *   get:
 *     summary: Get a single subcategory by ID
 *     tags: [Subcategories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The subcategory ID
 *     responses:
 *       200:
 *         description: Details of the subcategory
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Subcategory'
 *       404:
 *         description: Subcategory not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Subcategory not found
 *   patch:
 *     summary: Update a single subcategory by ID
 *     tags: [Subcategories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The subcategory ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Subcategory'
 *     responses:
 *       200:
 *         description: Subcategory updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Subcategory'
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
 *         description: Subcategory not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Subcategory not found
 *   delete:
 *     summary: Delete a single subcategory by ID
 *     tags: [Subcategories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The subcategory ID
 *     responses:
 *       200:
 *         description: Subcategory deleted successfully
 *       404:
 *         description: Subcategory not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Subcategory not found
 */

router
  .route("/")
  .get(filterObjectForNestedSubcategories, getAllSubcategories)
  .post(
    isAuth,
    allowedTo(USER_ROLES.ADMIN),
    setCategoryToBody,
    createSubcategoryValidator,
    createSubcategory
  );
router
  .route("/:id")
  .get(getSubCategoryValidator, getSingleSubcategory)
  .patch(
    isAuth,
    allowedTo(USER_ROLES.ADMIN),
    updateSubcategoryValidator,
    updateSingleSubcategory
  )
  .delete(
    isAuth,
    allowedTo(USER_ROLES.ADMIN),
    deleteSubcategoryValidator,
    deleteSingleSubcategory
  );

export default router;
