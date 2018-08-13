const express = require('express')
const router = express.Router()
const Plot = require('../models/Plot')
const Garden = require('../models/Garden')
const User = require('../models/User')

// GET /plots
router.get('/', (req, res) => {
	Plot.find({}, (err, plots) => {
		err ? res.send(err) : res.json(plots)
	})
})

// POST /plots
router.post('/', (req, res) => {
	console.log()
	Plot.create({
		name: req.body.name,
		season: req.body.season,
		length: req.body.length,
		width: req.body.width,
		gardenId: req.body.gardenId
	}, (err, plot) => {
		Garden.findById(req.body.gardenId, (err, garden) => {
			err ? res.send(err) :
			garden.plots.push(plot._id)
			garden.save();
			res.sendStatus(200);
		})
	})
})

// GET /plots/:id
router.get('/:id', (req, res) => {
	Plot.findOne({_id: req.params.id}, (err, plot) => {
		err ? res.send(err) : res.json(plot)
	})
})

// DELETE /plots/:id
router.delete('/:id', (req, res) => {
	Plot.findOneAndDelete({_id: req.params.id}, (err, plot) => {
		Garden.findOne({_id: plot.gardenId}, (err, garden) => {
			if (err) {
				console.log(err)
				res.send(err)
			} else {
				garden.update({$pull: {plots: req.params.id}});
				res.sendStatus(200);
			}
		})
	})
	
})



module.exports = router;