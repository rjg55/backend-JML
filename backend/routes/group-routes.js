const groupRouter = require("express").Router();

///////////REQUIRE IN CONTROLLER FUNCTIONS HERE\\\\\\\\\
const {
  getAllGroups,
  getGroupById,
  postGroup,
} = require("../controllers/group-controller");

/////////Put endpoints here\\\\\\\\\\\\\\\\\
groupRouter.get("/", getAllGroups);
groupRouter.get("/:group_id", getGroupById);
groupRouter.post("/", postGroup);

module.exports = groupRouter;
