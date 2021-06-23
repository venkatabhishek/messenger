const express = require('express');
const { Group, User } = require('../database/schemas');

const router = express.Router();


// create a message group
router.post('/create', requireAuth, (req, res) => {

    const { groupId, content } = req.body;

    let group = await Group.findById(groupId);
    if (!group) {
        return resError(res, 'Create message', { message: 'Group does not exist' });
    }

    group.messages.push({
        from: req.user,
        content
    });

    group.save((err, group) => {
        if(err){    
            resError(res, 'Create message save', err);
        }else{
            res.send(group);
        }
    })


})

module.exports = router;