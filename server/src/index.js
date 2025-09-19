import express from "express";
import pool from "./config/db.js";

const app = express();

app.get("/", async (req, res) => {
  const result = await pool.query("SELECT * FROM roles;");
  res.send(result.rows);
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running in localhost: ${port}`);
});
