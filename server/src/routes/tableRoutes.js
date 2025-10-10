import express from "express";
import {
  getAllTables,
  getAvaliableTables,
  getTableById,
} from "../controller/tableController.js";
import { validateTable } from "../middlewares/validationMiddleware.js";
import {
  createTableService,
  deleteTableService,
  updateTableService,
} from "../model/tableModel.js";

const router = express.Router();

router.get("/table", getAllTables);
router.post("/table", validateTable, createTableService);
router.get("/table/:id", getTableById);
router.get("/table/date/:date", getAvaliableTables);
router.put("/table/:id", validateTable, updateTableService);
router.delete("/table/:id", deleteTableService);

export default router;
