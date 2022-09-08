const eventRouter = require("express").Router();

///////////REQUIRE IN CONTROLLER FUNCTIONS HERE\\\\\\\\\
const {
  getAllEvents,
  getEventById,
  postEvent,
  deleteEvent,
  patchEvent,
} = require("../controllers/event-controller");

/////////Put endpoints here\\\\\\\\\\\\\\\\\
eventRouter.route("/").get(getAllEvents).post(postEvent);

eventRouter
  .route("/:event_id")
  .get(getEventById)
  .delete(deleteEvent)
  .patch(patchEvent);

module.exports = eventRouter;
