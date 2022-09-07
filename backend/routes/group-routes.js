const groupRouter = require("express").Router();

///////////REQUIRE IN CONTROLLER FUNCTIONS HERE\\\\\\\\\
const {
  getAllGroups,
  getGroupById,
} = require("../controllers/group-controller");

/////////Put endpoints here\\\\\\\\\\\\\\\\\
groupRouter.get("/", getAllGroups);
groupRouter.get("/:group_id", getGroupById);

module.exports = groupRouter;
