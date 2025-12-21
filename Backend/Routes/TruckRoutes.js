const express = require("express");
const router = express.Router();

const { protect } = require("../Middleware/Authmd");
const {
  addTruck,
  getMyTrucks,
  getAvailableTrucksForShipment,
  acceptShipmentRequest,
} = require("../Controller/TruckController");


router.post("/", protect, addTruck);
router.get("/", protect, getMyTrucks);

router.get("/available", protect, getAvailableTrucksForShipment);


router.post("/accept", protect, acceptShipmentRequest);

module.exports = router;
