const express = require("express");
const { PORT } = require("./config/serverConfig");
const apiRoutes = require("./routes/index");
const bodyParser = require("body-parser");
const app = express();
const UserService = require("./services/user-service");

const prepareAndStartServer = () => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use("/api", apiRoutes);

  app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
prepareAndStartServer();
