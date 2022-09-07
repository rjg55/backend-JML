const EventsMessages = require("../schemas/event-message-schema");

fetchAllEventMessages = () => {
  return EventsMessages.find({}).sort({ createdAt: -1 });
};

fetchEventMessageById = (id) => {
  return EventsMessages.find({ eventTag: id });
};

insertMessage = (id, newMessage) => {
  const { userTag, message } = newMessage;
  return EventsMessages.create({ eventTag: id, userTag, message });
};

removeMessage = (id) => {
  return EventsMessages.findByIdAndDelete(id);
};

module.exports = {
  fetchAllEventMessages,
  fetchEventMessageById,
  insertMessage,
  removeMessage,
};
