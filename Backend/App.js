const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRoutes = require("./Routes/AuthRoutes");
const shipmentRoutes = require("./Routes/ShipmentRoutes");
const truckRoutes = require("./Routes/TruckRoutes");

const app = express();

app.set("trust proxy", 1);

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.get("/health", (_, res) => res.send("OK"));

app.use("/api/auth", authRoutes);
app.use("/api/shipments", shipmentRoutes);
app.use("/api/trucks", truckRoutes);

module.exports = app;
