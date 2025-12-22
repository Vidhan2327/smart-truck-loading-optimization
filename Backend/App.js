const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRoutes = require("./Routes/AuthRoutes");
const shipmentRoutes = require("./Routes/ShipmentRoutes");
const TruckRoutes = require("./Routes/TruckRoutes");




const app = express();

app.use(express.json());
app.use(cookieParser());


app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/shipments", shipmentRoutes);
app.use("/api/trucks", TruckRoutes);


module.exports = app;
