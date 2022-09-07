const {
  fetchAllEvents,
  fetchEventById,
  insertEvent,
  removeEvent,
  updateEvent,
} = require(`${__dirname}/../models/event-models.js`);

exports.getAllEvents = (req, res, next) => {
  fetchAllEvents(req.query)
    .then((events) => {
      res.status(200).send({ events });
    })
    .catch(next);
};

exports.getEventById = (req, res, next) => {
  fetchEventById(req.params.event_id)
    .then((event) => {
      res.status(200).send({ event });
    })
    .catch(next);
};

exports.postEvent = (req, res, next) => {
  const newEvent = req.body;
  insertEvent(newEvent)
    .then((createdEvent) => {
      res.status(201).send({ event: createdEvent });
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteEvent = (req, res, next) => {
  fetchEventById(req.params.event_id)
    .then((checkedEvent) => {
      console.log(checkedEvent);
      removeEvent(checkedEvent._id).then(() => {
        res.status(204).send();
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchEvent = (req, res, next) => {
  const { event_id } = req.params;
  updateEvent(event_id, req.body)
    .then((event) => {
      res.status(200).send({ event });
    })
    .catch((err) => {
      next(err);
    });
};
