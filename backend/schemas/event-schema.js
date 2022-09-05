const mongoose = require('mongoose');

const eventsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    coords: {
      type: Object,
      required: true
    },
    startTime: {
      type: Date,
      required: true
    },
    endTime: {
      type: Date,
      required: true
    },
    avatar: {
      type: String,
      default: String
    },
    bio: {
      type: String
    },
    host: {
      type: String,
      required: true
    },
    guests: {
      type: [ { id: String } ]
    },
    active: {
      type: Boolean
    },
    group: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Events', eventsSchema);
