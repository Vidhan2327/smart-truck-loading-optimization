const cron = require("node-cron");
const Truck = require("../Models/Truck");
const Shipment = require("../Models/Shipment");

cron.schedule("* * * * *", async () => {
  try {
    const now = new Date();

    const finishedTrucks = await Truck.find({
      status: "En route",
      availableFrom: { $lte: now },
    });

    for (const truck of finishedTrucks) {
      truck.status = "Available";
      truck.availableFrom = null;
      await truck.save();

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
    }
  } catch (err) {
    console.error("Truck / Shipment cron error:", err);
  }
});
