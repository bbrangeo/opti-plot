const mongoose = require('mongoose');

const cropSchema = new mongoose.Schema({
	name: String,
	numPlanted: Number,
	spread: Number,
	rowSpacing: Number,
	sunRequirements: String,
	icon: String
})

const plotSchema = new mongoose.Schema({
	name: String,
	season: String,
	length: Number,
	width: Number,
	crops: [cropSchema],
	gardenId: {type: mongoose.Schema.Types.ObjectId, ref: 'Garden'}
})

const Plot = mongoose.model('Plot', plotSchema)

module.exports = Plot;