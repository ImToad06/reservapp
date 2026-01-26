import express from "express";
import {
  createTable,
  deleteTable,
  getAllTables,
  getAvaliableTables,
  getTableById,
  updateTable,
} from "../controller/tableController.js";
import { validateTable } from "../middlewares/validationMiddleware.js";

const router = express.Router();

router.get("/table", getAllTables);
router.post("/table", validateTable, createTable);
router.get("/table/:id", getTableById);
router.get("/table/date/:date", getAvaliableTables);
router.put("/table/:id", validateTable, updateTable);
router.delete("/table/:id", deleteTable);

export default router;
