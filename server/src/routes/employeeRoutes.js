import express from "express";
import { validateEmployee } from "../middlewares/validationMiddleware.js";
import {
  deleteEmployee,
  getAllEmployees,
  getEmployeeByEmail,
  getEmployeeById,
  getEmployeeByType,
  loginEmployee,
  registerEmployee,
  updateEmployee,
} from "../controller/employeeController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.get("/employee", getAllEmployees);
router.post("/employee/register", validateEmployee, registerEmployee);
router.post("/employee/login", loginEmployee);
router.get("/employee/:id", getEmployeeById);
router.get("/employee/email/:email", getEmployeeByEmail);
router.get("/employee/type/:type", getEmployeeByType);
router.put("/employee/:id", validateEmployee, updateEmployee);
router.delete("/employee/:id", deleteEmployee);
router.get(
  "/employee/admin",
  verifyToken,
  authorizeRoles("admin"),
  (req, res) => res.json({ message: "Hello admin" }),
);
router.get(
  "/employee/manager",
  verifyToken,
  authorizeRoles("admin", "manager"),
  (req, res) => res.json({ message: "Hello manager" }),
);

export default router;
