const httpStatus = require("http-status");
const routes = require("./routes/v1");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const cors = require("cors");
const express = require("express");
const ApiError = require("./utils/ApiError");
const errorHandler = require("./middlewares/error.middleware");
const app = express();

// set security HTTP headers
app.use(helmet());

//parse json request body
app.use(express.json());

//parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// enable CORS - cross origin resource sharing
app.use(cors());
app.options("*", cors());

app.use("/v1", routes);

app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Route not found"));
});

//TODO: Limit api calls

app.use(errorHandler);
module.exports = app;
