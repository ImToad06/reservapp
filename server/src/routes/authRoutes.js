import express from "express";
import { login, register } from "../controller/authController.js";
import { validateRegister } from "../middlewares/schemaValidationMiddleware.js";
const router = express.Router();

router.post("/register/user", validateRegister, register);
router.post("/login", login);

export default router;
