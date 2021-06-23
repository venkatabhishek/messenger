const express = require('express');
const { requireAuth, resError } = require('./middleware');
const { Group, User } = require('../database/schemas');

const router = express.Router();

// create a message group
router.post('/create', requireAuth, (req, res) => {

    const { name, members } = req.body;

    const group = new Group({
        name,
        members
    });

    group.save((err, group) => {
        if (err) {
            resError(res, 'Create group', err);
        } else {
            res.send(group);
        }

    })

})

// add member to group
router.post('/add', requireAuth, async (req, res) => {

    const { memberId, groupId } = req.body;

    let group = await Group.findById(groupId);
    if (!group) {
        return resError(res, 'Add member', { message: 'Group does not exist' });
    }

    let member = await User.findById(memberId);
    if (!member) {
        return resError(res, 'Add member', { message: 'User does not exist' })
    }

    // check if user is already in group
    if(group.members.include(member)){
        return resError(res, 'Add member', { message: 'User already in group' })
    }

    group.members.push(member);
    group.save((err, group) => {
        if(err){    
            resError(res, 'Add member save', err);
        }else{
            res.send(group);
        }
    })

})

module.exports = router;