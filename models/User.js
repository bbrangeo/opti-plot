const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
	name: String,
	email: { type: String, required: false },
	password: { type: String, required: false },
	gardens: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Garden' }]
})

userSchema.set('toObject', {
	transform: function (doc, ret, options) {
		let returnJson = {
			_id: ret._id,
			name: ret.name,
			email: ret.email,
			gardens: ret.gardens
		}
		return returnJson;
	}
})

userSchema.methods.authenticated = function (password) {
	return bcrypt.compareSync(password, this.password);
}

userSchema.pre('save', function (next) {
	if (this.isNew) {
		let hash = bcrypt.hashSync(this.password, 12);
		this.password = hash;
	}
	next();
});

const User = mongoose.model('User', userSchema)

module.exports = User;
