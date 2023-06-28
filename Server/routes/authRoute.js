import express from "express";
import {
  registerController,
  loginController,
  testController,
} from "../controllers/authController.js";

import { isAdmin, requireSignIn } from "../midllewares/authMiddleware.js";

//router object;

const router = express.Router();

//routing
//Register Router
router.post("/register", registerController);

//Login || POST
router.post("/login", loginController);

//tets
router.get("/test", requireSignIn, isAdmin, testController);

export default router;
