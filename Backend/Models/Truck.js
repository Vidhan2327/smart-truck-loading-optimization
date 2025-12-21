const mongoose = require("mongoose");

const routeSchema = new mongoose.Schema(
  {
    pickupLocation: String,
    destination: String,
    costPerKm: Number,
  },
  { _id: false }
);

const truckSchema = new mongoose.Schema(
  {
    dealerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    type: {
      type: String,
      enum: ["Mini", "Medium", "Heavy"],
      required: true,
    },

    capacity: {
      type: Number, // kg
      required: true,
    },

    volume: {
      type: Number, // m³
      required: true,
    },

    driverType: {
      type: String,
      enum: ["Individual", "Company"],
      required: true,
    },

    driverName: String,
    driverAddress: String,

    companyName: String,
    managerName: String,

    currentCity: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["Available", "En route"],
      default: "Available",
    },

    availableFrom: {
      type: Date,
      default: Date.now,
    },

    routes: {
      type: [routeSchema],
      required: true,
    },

    tripsCompleted: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Truck", truckSchema);
