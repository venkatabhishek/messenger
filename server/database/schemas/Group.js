const mongoose = require('mongoose');

const { Schema } = mongoose;

const groupSchema = new Schema({
  name: {
    type: String,
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
});

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;
