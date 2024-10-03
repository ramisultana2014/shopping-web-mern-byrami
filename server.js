const mongoose = require("mongoose");

const app = require("./app");

//Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log("uncaught exception! SHUTTING DOWN.....");
  console.error(err.name, err.message);
  process.exit(1);
});

// This string comes from Atlas connect
const DB = process.env.DATABASE;

// Connect to MongoDB
mongoose.connect(DB).then(() => console.log("DB connection successful!"));
const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

// Handle unhandled rejections
process.on("unhandledRejection", (err) => {
  console.log("unhandled rejection! SHUTTING DOWN.....");
  console.error(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
