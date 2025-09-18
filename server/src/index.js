import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running in localhost: ${port}`);
});
