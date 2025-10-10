import express from "express";
import employeeRoutes from "./routes/employeeRoutes.js";
import tableRoutes from "./routes/tableRoutes.js";
import cors from "cors";
import { genTables } from "./config/tables.js";

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

app.use("/api", employeeRoutes);
app.use("/api", tableRoutes);

const PORT = process.env.PORT;
const genDb = async () => {
  try {
    await genTables();
    console.log("Database tables initialized");
  } catch (error) {
    console.error("Failed to initialize database:", error);
    process.exit(1);
  }
};
genDb();

app.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
});
