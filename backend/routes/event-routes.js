const eventRouter = require("express").Router();

///////////REQUIRE IN CONTROLLER FUNCTIONS HERE\\\\\\\\\
const {
  getAllEvents,
  getEventById,
} = require("../controllers/event-controller");

/////////Put endpoints here\\\\\\\\\\\\\\\\\
eventRouter.get("/", getAllEvents);
// eventRouter.get("/events/:event_id", getEventById);

module.exports = eventRouter;
