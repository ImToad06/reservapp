import express from "express";
import pool from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";
import { genTables } from "./config/tables.js";

const app = express();

// Middleware
app.use(express.json());

// Configuración de CORS global
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

// Routes
app.use("/", async () => {
  genTables();
});
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/user/reserve", reserveRoutes);

const port = process.env.PORT;
const startServer = async () => {
  try {
    await genTables();
    console.log("Database tables initialized");
    app.listen(port, () => {
      console.log(`Server is running on localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to initialize database:", error);
    process.exit(1);
  }
};
startServer();
