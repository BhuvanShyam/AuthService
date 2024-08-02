const express = require("express");
const { PORT } = require("./config/serverConfig");
const apiRoutes = require("./routes/index");
const bodyParser = require("body-parser");
const app = express();
const db = require("./models/index");
const { User, Role } = require("./models/index");

const prepareAndStartServer = () => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use("/api", apiRoutes);

  app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    if (process.env.DB_SYNC) {
      db.sequelize.sync({ alter: true });
    }

    //these function provide automatically by sequelize hasModel_name(),getModel-name(),and many more function
    // const u1 = await User.findByPk(1);
    // const r1 = await Role.findByPk(2);
    // // u1.addRole(r1);
    // const response = await u1.getRoles();
    // console.log(response);
  });
};
prepareAndStartServer();
