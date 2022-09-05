const mongoose = require('mongoose');

const eventsMessagesSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    tag: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Events-Messages', eventsMessagesSchema);
