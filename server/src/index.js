import express from "express";
import pool from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";


const app = express();

// Middleware
app.use(express.json());

// ✅ Configuración de CORS global
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
}));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running in localhost: ${port}`);
});
