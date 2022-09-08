const userRouter = require("express").Router();

///////////REQUIRE IN CONTROLLER FUNCTIONS HERE\\\\\\\\\
const {
  getAllUsers,
  getUserById,
  postUser,
  deleteUser,
  patchUser,
} = require("../controllers/user-controller");

/////////Put endpoints here\\\\\\\\\\\\\\\\\
userRouter.route("/").get(getAllUsers).post(postUser);

userRouter.route("/:_id").get(getUserById).delete(deleteUser).patch(patchUser);

module.exports = userRouter;
