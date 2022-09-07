const {
  fetchAllEventMessages,
  fetchEventMessageById,
  insertMessage
} = require(`../models/event-message-models`);

// GET all event messages by event Id
exports.getAllMessagesByEventId = (req, res, next) => {
  const { event_id } = req.params;
  fetchAllEventMessages(event_id)
    .then((messages) => {
      res.status(200).send(messages);
    })
    .catch(next);
};

//POST comment
exports.addMessage = (req, res, next) => {
  const { event_id } = req.params;
  const newMessage = req.body;
  insertMessage(event_id, newMessage)
    .then((message) => {
      res.status(201).send(message);
    })
    .catch((err) => {
      console.log(err);
      next();
    });
};
