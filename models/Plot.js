const mongoose = require('mongoose');

const cropSchema = new mongoose.Schema({
	name: String,
	numPlanted: Number,
	spread: Number,
	rowSpacing: Number
})

const plotSchema = new mongoose.Schema({
	name: String,
	season: String,
	length: Number,
	width: Number,
	crops: [cropSchema]
})

const Plot = mongoose.model('Plot', plotSchema)

module.exports = Plot;