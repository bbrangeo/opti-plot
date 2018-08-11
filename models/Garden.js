const mongoose = require('mongoose');

const gardenSchema = new mongoose.Schema({
	name: String,
	userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	plots: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Plot' }]
})

const Garden = mongoose.model('Garden', gardenSchema)

module.exports = Garden;