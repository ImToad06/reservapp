import express from "express";
import { reserve } from "../controller/userController";

const router = express.Router();

router.post("/create", reserve);

export default router;
