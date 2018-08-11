const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User')
const Garden = require('../models/Garden')
const Plot = require('../models/Plot')

// GET /user/:id
router.get('/:id', (req, res) => {
	User.findOne({_id: req.params.id})
		.populate('gardens')
		.exec( (err, user) => {
			err ? res.send(err) : 
			res.json(user);
		})
})

module.exports = router;