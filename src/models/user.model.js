const { Schema, model } = require('mongoose');

const UserSchema = Schema({
	name: {
		type: String,
		required: [true, 'This name is required!'],
	},
	email: {
		type: String,
		required: [true, 'This email is required!'],
		unique: true,
	},
	password: {
		type: String,
		required: [true, 'This password is required!'],
	},
	img: {
		type: String,
	},
	role: {
		type: String,
		required: [true, 'This role is required!'],
		enum: ['ADMIN_ROLE', 'USER_ROLE'],
	},
	status: {
		type: Boolean,
		default: true,
	},
	google: {
		type: Boolean,
		default: false,
	},
});

UserSchema.methods.toJSON = function () {
	const { __v, password, ...user } = this.toObject();
	return user;
};

module.exports = model('User', UserSchema);
