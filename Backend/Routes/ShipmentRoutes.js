const express = require("express");
const router = express.Router();

const { protect } = require("../Middleware/Authmd");
const {
  createShipment,
  getMyShipments,
  requestTruck,
  getRequestedShipments,
  payInvoice,
} = require("../Controller/ShipmentController");

router.post("/", protect, createShipment);
router.get("/", protect, getMyShipments);

router.post("/request", protect, requestTruck);
router.get("/requests", protect, getRequestedShipments);


router.post("/pay", protect, payInvoice);

module.exports = router;
