const mongoose = require('mongoose');

const eventsMessagesSchema = new mongoose.Schema(
  {
    userTag: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },

    eventTag: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('EventsMessages', eventsMessagesSchema);
