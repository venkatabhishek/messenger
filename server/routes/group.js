const express = require('express');
const { requireAuth, resError } = require('./middleware');
const { Group, User } = require('../database/schemas');

const router = express.Router();

// get all of a users groups
router.get('/all', requireAuth, (req, res) => {

    Group.find({
        $or: [
            { members: req.user },
            { owner: req.user }
        ]
    }, (err, groups) => {
        if(err) console.log(err)

        res.send(groups)
    })

})

// create a message group
// TODO: send id instead of username?
router.post('/create', requireAuth, async (req, res) => {

    let { name, members } = req.body;

    members = await members.reduce(async (acc, cur) => {

        let m = await User.findOne({ username: cur });
        if (m) {
            acc.push(m)
        }
        return acc;

    }, []);

    const group = Group({
        name,
        members,
        owner: req.user,
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
    if (group.members.include(member)) {
        return resError(res, 'Add member', { message: 'User already in group' })
    }

    group.members.push(member);
    group.save((err, group) => {
        if (err) {
            resError(res, 'Add member save', err);
        } else {
            res.send(group);
        }
    })

})

module.exports = router;