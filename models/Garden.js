const mongoose = require('mongoose');

const chosenCropSchema = new mongoose.Schema({
	name: String,
	spread: Number,
	rowSpacing: Number,
	icon: String,
	ofId: String,
	sunRequirements: String,
})

const gardenSchema = new mongoose.Schema({
	name: String,
	userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	plots: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Plot' }],
	cropsChosen: [chosenCropSchema]
})

const Garden = mongoose.model('Garden', gardenSchema)

module.exports = Garden;