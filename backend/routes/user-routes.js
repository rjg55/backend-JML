const userRouter = require("express").Router();

///////////REQUIRE IN CONTROLLER FUNCTIONS HERE\\\\\\\\\
const { getAllUsers } = require("../controllers/user-controller");

/////////Put endpoints here\\\\\\\\\\\\\\\\\
userRouter.get("/", getAllUsers);

module.exports = userRouter;
