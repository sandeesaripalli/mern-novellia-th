// src/server.js
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const { swaggerUi, specs } = require("./swagger"); // Import swagger setup

const app = express();
const port = process.env.PORT || 4000;

const mongoUrl = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin`;

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));
app.use((req, res, next) => {
  console.log("Request received--------->", req.method, req.url);
  console.log("Request headers------>", req.headers);
  next();
});
// CORS configuration
app.use(
  cors({
    origin: "*", // Allow all origins. Adjust as needed for your environment.
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);

app.use(bodyParser.json());

const petRoutes = require("./routes/petRoutes");
app.use("/pets", petRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs)); // Use swagger

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
