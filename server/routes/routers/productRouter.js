import express from "express";
import {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateSingleProduct,
  deleteSingleProduct,
  getTopAliases,
  uploadProductImages,
  resizeProductImages,
} from "../../controller/productController.js";
import { allowedTo, isAuth } from "../../middleware/auth.middleware.js";
import { USER_ROLES } from "../../constants/index.js";
import {
  getProductValidator,
  createProductValidator,
  updateProductValidator,
  deleteProductValidator,
} from "../../validators/product.validator.js";
import reviewRouter from "./reviewRouter.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         // Define properties of the Product schema here
 */

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API for managing products
 */

/**
 * @swagger
 * /products/top-rated:
 *   get:
 *     summary: Get top-rated products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of top-rated products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */

// Define similar documentation for other top-related routes like /products/top-sold, /products/top-sales, /products/new-arrivals

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of all products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: New product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get a single product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *     responses:
 *       200:
 *         description: Details of the product
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Product not found
 *   patch:
 *     summary: Update a single product by ID
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
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
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Product not found
 *   delete:
 *     summary: Delete a single product by ID
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Product not found
 */

// NESTED_ROUTES_[GET reviews which belongs to specific product, CREATE a review on a specific product]
router.use("/:productId/reviews", reviewRouter);

router.route("/top-rated").get(getTopAliases("-ratingAverage"), getAllProducts);
router.route("/top-sold").get(getTopAliases("-sold"), getAllProducts);
router.route("/top-sales").get(getTopAliases("-discount"), getAllProducts);
router.route("/new-arrivals").get(getTopAliases("-createdAt"), getAllProducts);

router
  .route("/")
  .get(getAllProducts)
  .post(
    isAuth,
    allowedTo(USER_ROLES.ADMIN),
    uploadProductImages,
    resizeProductImages,
    createProductValidator,
    createProduct
  );
router
  .route("/:id")
  .get(getProductValidator, getSingleProduct)
  .patch(
    isAuth,
    allowedTo(USER_ROLES.ADMIN),
    uploadProductImages,
    resizeProductImages,
    updateProductValidator,
    updateSingleProduct
  )
  .delete(
    isAuth,
    allowedTo(USER_ROLES.ADMIN),
    deleteProductValidator,
    deleteSingleProduct
  );

export default router;
