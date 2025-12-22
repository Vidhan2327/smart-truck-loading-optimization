const mongoose = require("mongoose");

const shipmentSchema = new mongoose.Schema(
  {
    pickupLocation: { type: String, required: true },
    destination: { type: String, required: true },

    weight: { type: Number, required: true },
    volume: { type: Number, required: true },

    senderType: {
      type: String,
      enum: ["Company", "Individual"],
      required: true,
    },

    companyName: { type: String, default: null },
    senderName: { type: String, required: true },

    pickupAddress: { type: String, required: true },
    deliveryAddress: { type: String, required: true },

    expectedDeliveryDate: {
      type: Date,
      required: true,
    },

    warehouseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    requestedTruckId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Truck",
      default: null,
    },

    requestedDealerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    acceptedTruckId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Truck",
      default: null,
    },

    acceptedDealerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    status: {
      type: String,
      enum: ["Pending", "Requested", "In Transit", "Delivered"],
      default: "Pending",
    },

   
    paymentStatus: {
      type: String,
      enum: ["Unpaid", "Partial", "Completed"],
      default: "Unpaid",
    },
    

    deliveredAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Shipment", shipmentSchema);
