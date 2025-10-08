import express from "express";
import { reserve } from "../controller/userController.js";

const router = express.Router();

router.post("/create", reserve);

export default router;
