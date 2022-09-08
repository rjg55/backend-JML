const Events = require(`${__dirname}/../schemas/event-schema.js`);
const fs = require("fs/promises");

exports.fetchAllEvents = async (input) => {
  const { sort_by = "startDate", order = -1, category, active = true } = input;
  let allEvents = "";
  if (category) {
    allEvents = await Events.find({ category: category, active }).sort({
      [sort_by]: order,
    });
  } else {
    allEvents = await Events.find({ active }).sort({ [sort_by]: order });
  }
  return allEvents;
};

exports.fetchEventById = async (event_id) => {
  const oneEvent = await Events.findOne({ _id: event_id });
  return oneEvent;
};

exports.insertEvent = (event) => {
  return Events.create(event);
};

exports.removeEvent = (event_id) => {
  return Events.findByIdAndDelete(event_id);
};

exports.updateEvent = (event_id, eventInfo) => {
  return Events.findByIdAndUpdate(event_id, { ...eventInfo }, { new: true });
};
