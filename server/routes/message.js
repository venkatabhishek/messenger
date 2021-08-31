const express = require('express');
const { requireAuth, resError } = require('./middleware');
const { Group, User } = require('../database/schemas');

const router = express.Router();

// get all messages for a single group
router.get('/group', (req, res) => {

    let { groupId } = req.body;
})

module.exports = router;