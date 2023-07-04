import express from "express";
import { isAdmin, requireSignIn } from "../midllewares/authMiddleware.js";
import {
  createProductController,
  deleteProductControlller,
  getProductConntroller,
  getSingleProductController,
  productPhotoController,
  updateProductController,
} from "../controllers/productController.js";
import formidable from "express-formidable";

const router = express.Router();

//Route Post
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

//Get Products
router.get("/get-product", getProductConntroller);

//Single Product
router.get("/get-product/:slug", getSingleProductController);

//Get Photo
router.get("/product-photo/:pid", productPhotoController);

//Delete Product
router.delete("/del-product/:pid", deleteProductControlller);

//Update
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

export default router;
