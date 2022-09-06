const { fetchAllEvents } = require(`${__dirname}/../models/event-models.js`);

exports.getAllEvents = (req, res, next) => {
  fetchAllEvents()
    .then(() => {})
    .catch(next);
};
