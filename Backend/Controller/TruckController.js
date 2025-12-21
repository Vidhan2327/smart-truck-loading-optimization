const Truck = require("../Models/Truck");
const Shipment = require("../Models/Shipment");
const cityDistance = require("../Utils/CityDistance");

exports.addTruck = async (req, res) => {
  const truck = await Truck.create({
    ...req.body,
    dealerId: req.user.id,
    status: "Available",
  });

  res.status(201).json(truck);
};

exports.getMyTrucks = async (req, res) => {
  const trucks = await Truck.find({ dealerId: req.user.id });
  res.json(trucks);
};

exports.getAvailableTrucksForShipment = async (req, res) => {
  const { pickupLocation, destination } = req.query;

  const distance = cityDistance[pickupLocation]?.[destination] || null;

  if (!distance) {
    return res.json([]);
  }

  const trucks = await Truck.find({
    status: "Available",
    availableFrom: { $lte: new Date() },
    routes: {
      $elemMatch: {
        pickupLocation,
        destination,
      },
    },
  });

  const enriched = trucks.map((truck) => {
    const route = truck.routes.find(
      (r) =>
        r.pickupLocation === pickupLocation && r.destination === destination
    );

    const estimatedTimeDays =
      truck.type === "Mini" ? 5 : truck.type === "Medium" ? 3 : 2;

    return {
      ...truck.toObject(),
      distanceKm: distance,
      estimatedCost: distance * route.costPerKm,
      estimatedTimeDays,
    };
  });

  res.json(enriched);
};

exports.acceptShipmentRequest = async (req, res) => {
  const { shipmentId } = req.body;

  const shipment = await Shipment.findById(shipmentId);
  if (!shipment) {
    return res.status(400).json({ message: "Shipment not found" });
  }

  const truck = await Truck.findById(shipment.requestedTruckId);
  if (!truck) {
    return res.status(400).json({ message: "Truck not found" });
  }

  shipment.status = "In Transit";
  shipment.acceptedTruckId = truck._id;
  shipment.acceptedDealerId = req.user.id;
  await shipment.save();

  truck.status = "En route";
  truck.currentCity = shipment.destination;
  truck.tripsCompleted += 1;

  // ✅ availability after ~30 minutes (ONLY CHANGE)
  truck.availableFrom = new Date(
    Date.now() + 30 * 60 * 1000 // 30 minutes
  );

  await truck.save();

  res.json({ message: "Shipment accepted" });
};
