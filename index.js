const config = require("./config/config");
const app = require("./app");
const mongoose = require("mongoose");

let server;

mongoose
  .connect(config.mongoose.url, config.mongoose.options)
  .then(() => {
    console.log("Connect to MongoDB");
    //Server start
    server = app.listen(config.port, () => {
      console.log(`listening on port ${config.port}`);
    });
  })
  .catch((err) => {
    console.log("connect fail", err);
  });

const exitHandler = () => {
  if (server) {
    process.exit(1);
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (err) => {
  console.log("Unexpected error: ", err);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);
process.on("SIGTERM", () => {
  //Signal to terminate the process
  if (server) {
    server.close();
  }
});
