const mongoose = require('mongoose');

const cropSchema = new mongoose.Schema({
	name: String,
	spread: Number,
	rowSpacing: Number,
	icon: String,
	ofId: String,
	companionIds: [String]
})

const gardenSchema = new mongoose.Schema({
	name: String,
	userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	plots: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Plot' }],
	cropsChosen: [cropSchema]
})

const Garden = mongoose.model('Garden', gardenSchema)

module.exports = Garden;