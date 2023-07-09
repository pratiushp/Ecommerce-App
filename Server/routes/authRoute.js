import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  updateProfileController,
  getOrderController,
} from "../controllers/authController.js";

import { isAdmin, requireSignIn } from "../midllewares/authMiddleware.js";

//router object;

const router = express.Router();

//routing
//Register Router
router.post("/register", registerController);

//Login || POST
router.post("/login", loginController);

//Forgot Password  || Post
router.post("/forgotpassword", forgotPasswordController);

//tets
router.get("/test", requireSignIn, isAdmin, testController);

//Protected Route auth user
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({
    ok: true,
  });
});

//Protected Route auth for admin
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({
    ok: true,
  });
});

//Update Prodile
router.put("/profile", requireSignIn, updateProfileController);

//order
router.get("/orders", requireSignIn, getOrderController);

export default router;
