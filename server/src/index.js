import express from "express";
import pool from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();
// Middleware
app.use(express.json());

// Routes
app.get("/", async (req, res) => {
  res.send("Hello, World!");
});

app.use("/api/auth", authRoutes);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running in localhost: ${port}`);
});
