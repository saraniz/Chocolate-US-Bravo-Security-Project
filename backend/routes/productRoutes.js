import express from "express";
import { createProduct, getProducts, getProduct, updateProduct, deleteProduct } from "../controllers/productController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createProduct);
router.get("/", getProducts);
router.get("/:id", getProduct);
router.patch("/:id", productMiddleware, updateProduct);
router.delete("/:id", productMiddleware, deleteProduct);

export default router;