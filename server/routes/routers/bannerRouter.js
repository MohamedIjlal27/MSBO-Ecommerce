import express from "express";
import { allowedTo, isAuth } from "../../middleware/auth.middleware.js";
import { USER_ROLES } from "../../constants/index.js";
import {
  getAllBanners,
  deleteSingleBanner,
  createBanner,
  updateSingleBanner,
  getSingleBanner,
  uploadBannerImage,
  resizeBannerImage,
} from "../../controller/bannerController.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Banner:
 *       type: object
 *       required:
 *         - title
 *         - imageUrl
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the banner
 *         imageUrl:
 *           type: string
 *           description: The URL of the banner image
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The creation date of the banner
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The last update date of the banner
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * tags:
 *   name: Banners
 *   description: The banner managing API
 */

/**
 * @swagger
 * /banners:
 *   get:
 *     summary: Retrieve a list of banners
 *     tags: [Banners]
 *     responses:
 *       200:
 *         description: A list of banners
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Banner'
 */
router.route("/").get(getAllBanners);

/**
 * @swagger
 * /banners:
 *   post:
 *     summary: Create a new banner
 *     tags: [Banners]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: The banner image
 *     responses:
 *       201:
 *         description: The banner was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Banner'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.use(isAuth, allowedTo(USER_ROLES.ADMIN));
router.route("/").post(uploadBannerImage, resizeBannerImage, createBanner);

/**
 * @swagger
 * /banners/{id}:
 *   get:
 *     summary: Get a single banner by id
 *     tags: [Banners]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The banner id
 *     responses:
 *       200:
 *         description: The banner description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Banner'
 *       404:
 *         description: Banner not found
 */
router.route("/:id").get(getSingleBanner);

/**
 * @swagger
 * /banners/{id}:
 *   patch:
 *     summary: Update a banner by id
 *     tags: [Banners]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The banner id
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: The banner image
 *     responses:
 *       200:
 *         description: The banner was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Banner'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Banner not found
 */
router
  .route("/:id")
  .patch(uploadBannerImage, resizeBannerImage, updateSingleBanner);

/**
 * @swagger
 * /banners/{id}:
 *   delete:
 *     summary: Delete a banner by id
 *     tags: [Banners]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The banner id
 *     responses:
 *       200:
 *         description: The banner was successfully deleted
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Banner not found
 */
router.route("/:id").delete(deleteSingleBanner);

export default router;
