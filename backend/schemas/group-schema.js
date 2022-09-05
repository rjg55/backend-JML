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
    rating: {
      type: [ Number ]
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Group', groupSchema);
