const mongoose = require("mongoose");
require("dotenv").config();


const app = require("./App");
require("./Jobs/TruckAvailability");


// Port: local uses 5000, production gets it from platform
const PORT = process.env.PORT || 5000;

// Host handling:
// - Windows dev: force IPv4 to avoid ERR_CONNECTION_REFUSED
// - Production: bind to all interfaces
const HOST =
  process.env.NODE_ENV === "production" ? "0.0.0.0" : "127.0.0.1";

async function startServer() {
  try {
    // MongoDB connection
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    // Start server
    app.listen(PORT, HOST, () => {
      console.log(`Server running on ${HOST}:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

startServer();
