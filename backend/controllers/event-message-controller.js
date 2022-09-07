const {
  fetchAllEventMessages,
  insertMessage,
  removeMessage,
} = require(`../models/event-message-models`);

// GET all event messages by event Id
exports.getAllMessagesByEventId = (req, res, next) => {
  const { event_id } = req.params;
  fetchAllEventMessages(event_id)
    .then((messages) => {
      res.status(200).send({ messages });
    })
    .catch(next);
};

//POST comment
exports.addMessage = (req, res, next) => {
  const { event_id } = req.params;
  const newMessage = req.body;
  insertMessage(event_id, newMessage)
    .then((message) => {
      res.status(201).send({ message });
    })
    .catch((err) => {
      next(err.errors.message.properties);
    });
};

exports.deleteMessage = (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  removeMessage(id)
    .then(() => {
      res.status(204).send();
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};
