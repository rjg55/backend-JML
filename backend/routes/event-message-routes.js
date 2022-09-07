const eventMessageRouter = require("express").Router();

// REQUIRE IN CONTROLLER FUNCTIONS HERE
const {
  getAllMessagesByEventId,
  addMessage,
  deleteMessage,
} = require("../controllers/event-message-controller");

eventMessageRouter
  .route("/events/:event_id")
  .get(getAllMessagesByEventId)
  .post(addMessage);

eventMessageRouter.route("/:id").delete(deleteMessage);

module.exports = eventMessageRouter;
