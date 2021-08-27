const mongoose = require('mongoose');

const { Schema } = mongoose;

// group or direct message
const groupSchema = new Schema({
  name: {
    type: String,
    unique: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  messages: {
    type: [
      {
        from: {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
        content: {
          type: String,
        },
      },
    ],
    default: [],
  },
});

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;
