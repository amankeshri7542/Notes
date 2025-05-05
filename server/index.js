const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const noteRoutes = require("./routes/notes");
const { connectDB } = require("./db");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/api/notes", noteRoutes);

// Routes
app.get("/", (req, res) => res.send("Welcome to MERN Notes API"));
app.get("/api", (req, res) => res.json({ message: "API Running" }));

// Connect and start server
connectDB().then((isConnected) => {
  app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
    if (!isConnected) console.warn("⚠️ Running without MongoDB");
  });
});
