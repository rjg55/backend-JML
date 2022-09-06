const eventRouter = require("express").Router();

///////////REQUIRE IN CONTROLLER FUNCTIONS HERE\\\\\\\\\
const { getAllEvents } = require("../controllers/event-controller");

/////////Put endpoints here\\\\\\\\\\\\\\\\\
eventRouter.get("/", getAllEvents);

module.exports = eventRouter;
