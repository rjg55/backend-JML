const groupRouter = require("express").Router();

///////////REQUIRE IN CONTROLLER FUNCTIONS HERE\\\\\\\\\
const {
  getAllGroups,
  getGroupById,
  postGroup,
  patchGroupByID,
} = require("../controllers/group-controller");

/////////Put endpoints here\\\\\\\\\\\\\\\\\
groupRouter.get("/", getAllGroups);
groupRouter.get("/:group_id", getGroupById);
groupRouter.patch("/:group_id", patchGroupByID);
groupRouter.post("/", postGroup);

module.exports = groupRouter;
