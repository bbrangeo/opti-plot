const express = require('express')
const router = express.Router()
const Plots = require('../models/Plot')

// GET /plots
router.get('/', (req, res) => {
	Plot.find({}, (err, plots) => {
		err ? res.send(err) : res.json(plots)
	})
})

// POST /plots
router.post('/', (req, res) => {
	Plot.create({
		
	})
})



module.exports = router;