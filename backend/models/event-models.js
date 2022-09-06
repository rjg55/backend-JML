const Events = require(`${__dirname}/../schemas/event-schema.js`);
const fs = require("fs/promises");

exports.fetchAllEvents = async (input) => {
  const { sort_by = "startDate", order = -1, category } = input;
  let allEvents = "";
  if (category) {
    allEvents = await Events.find({ category: category }).sort({
      [sort_by]: order,
    });
  } else {
    allEvents = await Events.find({}).sort({ [sort_by]: order });
  }
  return allEvents;
};

exports.fetchEventById = async (event_id) => {
  const allEvents = await Events.findOne({ _id: event_id });
  return allEvents;
};
