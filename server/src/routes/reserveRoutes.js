import express from "express";
import {
  createReserve,
  deleteReserve,
  getAllReserves,
  getReserveByDate,
  getReserveById,
  getReserveByUser,
  updateReserve,
} from "../controller/reserveController.js";
import { validateReserve } from "../middlewares/validationMiddleware.js";

const router = express.Router();

router.get("/reserve", getAllReserves);
router.post("/reserve", validateReserve, createReserve);
router.get("/reserve/:id", getReserveById);
router.get("reserve/user/:user", getReserveByUser);
router.get("reserve/date/:date", getReserveByDate);
router.put("/reserve/:id", updateReserve);
router.delete("/reserve/:id", deleteReserve);

export default router;
