const groupRouter = require("express").Router();

///////////REQUIRE IN CONTROLLER FUNCTIONS HERE\\\\\\\\\
const {
  getAllGroups,
  getGroupById,
  postGroup,
  patchGroupByID,
  deleteGroupByID,
} = require("../controllers/group-controller");

/////////Put endpoints here\\\\\\\\\\\\\\\\\
groupRouter.get("/", getAllGroups);
groupRouter.get("/:group_id", getGroupById);
groupRouter.patch("/:group_id", patchGroupByID);
groupRouter.post("/", postGroup);
groupRouter.delete("/:group_id", deleteGroupByID);

module.exports = groupRouter;
