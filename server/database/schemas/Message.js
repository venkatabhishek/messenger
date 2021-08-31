const mongoose = require('mongoose');

const { Schema } = mongoose;

const messageSchema = new Schema({
    content: {
        type: String,
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    date: {
        type: Date,
        default: new Date()
    },
    group: {
        type: Schema.Types.ObjectId,
        ref: 'Group',
    }
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
