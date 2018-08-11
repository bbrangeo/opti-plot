const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User');
const Garden = require('../models/Garden');


// GET /gardens
router.get('/', (req, res) => {
	Garden.find({}, (err, gardens) => {
		err? res.send(err) : res.json(gardens);
	})
})

// POST /gardens
router.post('/', (req, res) => {
	console.log('<><>< GARDEN POST', req.body.userId)
	Garden.create({
		name: req.body.name,
		userId: req.body.userId
	}, (err, garden) => {
		console.log("________________________GARDEN CREATED",garden)
		User.findById(req.body.userId, function (err, user) {
			console.log("___USER => ", user)
			err ? res.send(err) : 
			user.gardens.push(garden._id)
			user.save();
			res.sendStatus(200);
		})
	})
})

// GET /gardens/:id
router.get('/:id', (req,res) => {
	Garden.findOne({_id: req.params.id})
		.populate('plots')
		.exec( (err, garden) => {
		err? console.log(err) : res.json(garden)
	})
})

// PUT /gardens/:id
router.put('/:id', (req, res) => {
	let updates = req.body;
	Garden.findByIdAndUpdate(req.params._id, {
		$set: updates
	}, {new: true}, (err, garden) => {
		err ? res.send(err) :
		garden.save( () => {
			console.log(garden);
			res.json(garden)
		})
	})
})

// DELETE /gardens/:id
router.delete('/:id', (req, res) => {
	Garden.remove({_id: req.params.id}, (err) => {
		res.send(err)
	})
	res.sendStatus(200);
})


module.exports = router;