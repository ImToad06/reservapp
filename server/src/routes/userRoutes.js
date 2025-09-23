import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.get("/admin", verifyToken, authorizeRoles("admin"), (req, res) => {
  res.json({
    message: "welcome admin",
  });
});

router.get(
  "/employee",
  verifyToken,
  authorizeRoles("admin", "employee"),
  (req, res) => {
    res.json({
      message: "welcome employee",
    });
  },
);

router.get(
  "/user",
  verifyToken,
  authorizeRoles("admin", "employee", "user"),
  (req, res) => {
    res.json({
      message: "welcome user",
    });
  },
);

export default router;
