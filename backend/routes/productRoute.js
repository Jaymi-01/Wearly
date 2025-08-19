import express from "express";
import {getAllProducts, getFeaturedProducts} from "../controllers/productController.js";
import {protectRoute, adminRoute} from "../middleware/authMiddleware.js";

const router = express.Router();



router.get("/", protectRoute, adminRoute, getAllProducts);
router.get("/featured", getFeaturedProducts);

export default router;
