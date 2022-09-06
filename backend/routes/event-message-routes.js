const eventMessageRouter = require("express").Router();

///////////REQUIRE IN CONTROLLER FUNCTIONS HERE\\\\\\\\\
const {
  getAllEventMessages,
} = require("../controllers/event-message-controller");

/////////Put endpoints here\\\\\\\\\\\\\\\\\
eventMessageRouter.get("/", getAllEventMessages);

module.exports = eventMessageRouter;
