const Shipment = require("../Models/Shipment");
const Truck = require("../Models/Truck");

exports.createShipment = async (req, res) => {
  try {
    const shipment = await Shipment.create({
      ...req.body,
      warehouseId: req.user.id,
      status: "Pending",
    });
    res.status(201).json(shipment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getMyShipments = async (req, res) => {
  const shipments = await Shipment.find({
    warehouseId: req.user.id,
  }).sort({ createdAt: -1 });

  res.json(shipments);
};

exports.requestTruck = async (req, res) => {
  const { shipmentId, truckId } = req.body;

  const shipment = await Shipment.findById(shipmentId);
  const truck = await Truck.findById(truckId);

  shipment.requestedTruckId = truck._id;
  shipment.requestedDealerId = truck.dealerId;
  shipment.status = "Requested";

  await shipment.save();
  res.json({ message: "Request sent" });
};

exports.getRequestedShipments = async (req, res) => {
  const shipments = await Shipment.find({
    status: "Requested",
    requestedDealerId: req.user.id,
  }).populate("requestedTruckId");

  res.json(shipments);
};

exports.payInvoice = async (req, res) => {
  const { shipmentId } = req.body;

  const shipment = await Shipment.findById(shipmentId);
  if (!shipment || shipment.status !== "In Transit") {
    return res.status(400).json({ message: "Invalid shipment" });
  }

  shipment.amountPaid = 1000;
  shipment.paymentStatus = "Partial";

  await shipment.save();

  res.json({ message: "₹1000 paid successfully" });
};
