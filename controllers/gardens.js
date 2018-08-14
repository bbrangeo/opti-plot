const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User');
const Garden = require('../models/Garden');
const Plot = require('../models/Plot');


// GET /gardens
router.get('/', (req, res) => {
	Garden.find({}, (err, gardens) => {
		err? res.send(err) : res.json(gardens);
	})
})

// POST /gardens
router.post('/', (req, res) => {
	Garden.create({
		name: req.body.name,
		userId: req.body.userId
	}, (err, garden) => {
		User.findById(req.body.userId, function (err, user) {
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
	Garden.findByIdAndUpdate(req.params.id, {
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
		err ? res.send(err) : res.sendStatus(200);
	})
})

// PUT /gardens/:id/addcrop
router.put('/:id/addcrop', (req,res) => {
	console.log(req.body)
	Garden.findById(req.params.id, function(err, garden) {
		console.log("GARDEN____>", garden)
		if (err) {
			console.log(err)
		} else {
			garden.cropsChosen.push({
				name: req.body.name,
				spread: req.body.spread,
				rowSpacing: req.body.rowSpacing,
				icon: req.body.icon,
				ofId: req.body.ofId,
				sunRequirements: req.body.sunRequirements
			})
			garden.save()
			res.sendStatus(200);
		}
	})
})

router.put('/:id/optimize', (req, res) => {
	Garden.findById(req.params.id, function (err, garden) {
		if (err) {
			res.send(err)
		} else {
			if (garden.cropsChosen.length > 0 && garden.plots.length > 0) {
				console.log("OPTIMIZE", garden)
				// optimize - placeholder
				garden.plots.forEach(gardenplot => {
					Plot.findById(gardenplot._id, function (err, plot) {
						if (err) console.log("err", err)
						garden.cropsChosen.forEach( crop => {
							plot.crops.push({
								name: crop.name,
								numPlanted: 5,
								spread: crop.spread,
								rowSpacing: crop.rowSpacing,
								sunRequirements: crop.sunRequirements,
								icon: crop.icon
							})
							plot.save()
						})
						console.log(garden)
					})
				})
				res.sendStatus(200);
			} else {
				res.sendStatus(300);
			}
		}
	})
})



module.exports = router;
