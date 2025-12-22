const cron = require("node-cron");
const Truck = require("../Models/Truck");
const Shipment = require("../Models/Shipment");

/**
 * CRON RUNS EVERY MINUTE
 * Handles TWO PHASES:
 * 1. DISPATCH (Available -> En route)
 * 2. COMPLETE (En route -> Delivered -> Available)
 */
cron.schedule("* * * * *", async () => {
  try {
    const now = new Date();
    const readyToDispatch = await Truck.find({
      status: "Available",
      availableFrom: { $lte: now },
      _id: {
        $in: await Shipment.distinct("acceptedTruckId", {
          status: "In Transit",
        }),
      },
    });

    for (const truck of readyToDispatch) {
      truck.status = "En route";

      truck.availableFrom = new Date(Date.now() + 15 * 60 * 1000);

      await truck.save();
    }

    const readyToComplete = await Truck.find({
      status: "En route",
      availableFrom: { $lte: now },
    });

    for (const truck of readyToComplete) {
      await Shipment.updateMany(
        {
          acceptedTruckId: truck._id,
          status: "In Transit",
        },
        {
          $set: {
            status: "Delivered",
            paymentStatus: "Completed",
            deliveredAt: new Date(),
          },
        }
      );
      truck.remainingCapacity = truck.capacity;
      truck.remainingVolume = truck.volume;

      truck.tripsCompleted = (truck.tripsCompleted || 0) + 1;

      truck.status = "Available";
      truck.availableFrom = new Date();

      await truck.save();
    }
  } catch (err) {
    console.error("Truck availability cron error:", err);
  }
});
