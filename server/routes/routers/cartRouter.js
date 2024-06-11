import express from "express";
import { isAuth } from "../../middleware/auth.middleware.js";
import {
  getMyCart,
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
  clearCart,
  applyCoupon,
} from "../../controller/cartController.js";
import {
  addToCartValidator,
  removeFromCartValidator,
  updateCartItemQuantityValidator,
  applyCouponValidator,
} from "../../validators/cart.validator.js";

const router = express.Router();

router.use(isAuth);

/**
 * @swagger
 * components:
 *   schemas:
 *     CartItem:
 *       type: object
 *       required:
 *         - productId
 *         - quantity
 *       properties:
 *         productId:
 *           type: string
 *           description: The product ID
 *         quantity:
 *           type: integer
 *           description: The quantity of the product
 *     Coupon:
 *       type: object
 *       required:
 *         - code
 *       properties:
 *         code:
 *           type: string
 *           description: The coupon code
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: The cart managing API
 */

/**
 * @swagger
 * /cart:
 *   get:
 *     summary: Get the current user's cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The current user's cart
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 items:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/CartItem'
 *                 totalPrice:
 *                   type: number
 *                   format: float
 *                   description: The total price of the cart
 *       401:
 *         description: Unauthorized
 */
router.route("/").get(getMyCart);

/**
 * @swagger
 * /cart:
 *   post:
 *     summary: Add an item to the cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CartItem'
 *     responses:
 *       201:
 *         description: The item was added to the cart
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CartItem'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.route("/").post(addToCartValidator, addToCart);

/**
 * @swagger
 * /cart:
 *   delete:
 *     summary: Clear the cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The cart was cleared
 *       401:
 *         description: Unauthorized
 */
router.route("/").delete(clearCart);

/**
 * @swagger
 * /cart/apply-coupon:
 *   patch:
 *     summary: Apply a coupon to the cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Coupon'
 *     responses:
 *       200:
 *         description: The coupon was applied
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Coupon applied successfully
 *       400:
 *         description: Invalid coupon code
 *       401:
 *         description: Unauthorized
 */
router.route("/apply-coupon").patch(applyCouponValidator, applyCoupon);

/**
 * @swagger
 * /cart/{productId}:
 *   patch:
 *     summary: Update the quantity of a cart item
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: string
 *         required: true
 *         description: The product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: integer
 *                 description: The new quantity
 *     responses:
 *       200:
 *         description: The quantity was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CartItem'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Item not found
 */
router
  .route("/:productId")
  .patch(updateCartItemQuantityValidator, updateCartItemQuantity);

/**
 * @swagger
 * /cart/{productId}:
 *   delete:
 *     summary: Remove an item from the cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: string
 *         required: true
 *         description: The product ID
 *     responses:
 *       200:
 *         description: The item was removed from the cart
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Item not found
 */
router.route("/:productId").delete(removeFromCartValidator, removeFromCart);

export default router;
