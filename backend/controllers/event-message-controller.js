const {
  fetchAllEventMessages,
} = require(`${__dirname}/../models/event-message-models.js`);

exports.getAllEventMessages = (req, res, next) => {
  fetchAllEventMessages()
    .then(() => {})
    .catch(next);
};
