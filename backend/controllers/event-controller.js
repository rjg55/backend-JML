const { fetchAllEvents } = require(`${__dirname}/../models/event-models.js`);

exports.getAllEvents = (req, res, next) => {
  fetchAllEvents(req.query)
    .then((events) => {
      res.status(200).send({ events });
    })
    .catch(next);
};

exports.getEventById = (req, res, next) => {
  fetchEventById(req.params)
    .then((event) => {
      res.status(200).send({ event });
    })
    .catch(next);
};
