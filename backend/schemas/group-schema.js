const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    category: {
      type: [ { name: String } ],
      required: true
    },
    description: {
      type: String,
      required: true
    },
    members: {
      type: [ { id: String } ]
    },
    admins: {
      type: [ { id: String } ]
    },
    thanks: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Group', groupSchema);
