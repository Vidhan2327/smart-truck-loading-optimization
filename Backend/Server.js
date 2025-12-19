const mongoose = require("mongoose");
require("dotenv").config();

const app = require("./App");

const PORT = 5000;

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    app.listen(PORT, "127.0.0.1", () => {
      console.log(`Server running on 127.0.0.1:${PORT}`);
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

startServer();
