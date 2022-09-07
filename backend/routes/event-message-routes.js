const eventMessageRouter = require('express').Router();

// REQUIRE IN CONTROLLER FUNCTIONS HERE
const {
  getAllMessagesByEventId,
  addMessage
} = require('../controllers/event-message-controller');

// Put endpoints here
eventMessageRouter
  .route('/events/:event_id')
  .get(getAllMessagesByEventId)
  .post(addMessage);

module.exports = eventMessageRouter;
