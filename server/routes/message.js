const express = require('express');
const { requireAuth, resError } = require('./middleware');
const { Group, User, Message  } = require('../database/schemas');

const router = express.Router();

// get all messages for a single group
router.get('/group/:groupId', async (req, res) => {

    let { groupId } = req.params;

    let group = await Group.findById(groupId);
    if (!group) {
        return resError(res, 'Get messages', { message: 'Group does not exist' });
    }

    Message.find({ group }).populate('author').sort({ date: 1 }).exec((err, messages) => {
        res.send(messages)

    });

})

const postMessage = async (data, userId) => {

    let { group, date, content } = data;

    group = await Group.findById(group);
    if (!group) {
        return resError(res, 'Get messages', { message: 'Group does not exist' });
    }

    let author = await User.findById(userId);

    const message = new Message({
        author,
        content,
        date,
        group
    })

    return await message.save();

}


const findUser = async (userId) => {

    return await User.findById(userId);

}


module.exports = { message: router, postMessage, findUser };