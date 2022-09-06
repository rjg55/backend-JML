const groupRouter = require("express").Router();

///////////REQUIRE IN CONTROLLER FUNCTIONS HERE\\\\\\\\\
const { getAllGroups } = require("../controllers/group-controller");

/////////Put endpoints here\\\\\\\\\\\\\\\\\
groupRouter.get("/", getAllGroups);

module.exports = groupRouter;
