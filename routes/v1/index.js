const config = require("../../config/config");
const express = require("express");
const taskRoute = require("./task.route");
const userRoute = require("./user.route");

const router = express.Router();

const defaultRoutes = [
  {
    path: "/api/tasks",
    route: taskRoute,
  },
  {
    path: "/api",
    route: userRoute,
  },
];

const devRoute = [
  // swagger route
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

if (config.env === "development") {
  devRoute.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
