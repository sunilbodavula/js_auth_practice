const express = require("express");

const healthRoutes = require("./routes/health.routes");
const authRoutes = require("./routes/auth.routes");

const app = express();

app.use(express.json());

app.use("/api/health", healthRoutes);
app.use("/api/auth", authRoutes);

module.exports = app;