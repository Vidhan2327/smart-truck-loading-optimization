const mongoose = require("mongoose");
require("dotenv").config();

const app = require("./App");

(async () => {
  await import("./Jobs/TruckAvailability.js");
})();

const PORT = process.env.PORT || 5000;
const HOST = "0.0.0.0";

async function startServer() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI not defined");
    }

    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected");

    app.listen(PORT, HOST, () => {
      console.log(`Server running on ${HOST}:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

startServer();
