const { request, response } = require('express');

const bcrypt = require('bcryptjs');

const User = require('../models/user.model');

const getUsers = async (req = request, res = response) => {
	const { limit = 5, till = 0 } = req.query;
	const query = { status: true };

	const [total, users] = await Promise.all([
		User.countDocuments(query),
		User.find(query).skip(Number(till)).limit(Number(limit)),
	]);

	res.json({
		total,
		users,
	});
};

const getUser = async (req, res = response) => {
	const { id } = req.params;

	const user = await User.findById(id);

	res.json({
		msg: `This user for id ${id} was found`,
		user,
	});
};

const newUser = async (req, res = response) => {
	const { name, email, password, role } = req.body;
	const newUser = new User({ name, email, password, role });

	// Encriptar la contrasena
	const salt = bcrypt.genSaltSync();
	newUser.password = bcrypt.hashSync(password, salt);

	// Guardar en DB
	if (newUser) {
		await newUser.save();
	}

	res.status(201).json({
		msg: 'User created successfully!',
		newUser,
	});
};

const updateUser = async (req, res = response) => {
	const { id } = req.params;
	const { _id, password, google, email, ...resto } = req.body;

	// TODO: Validar contrasena en la base de datos
	if (password) {
		const salt = bcrypt.genSaltSync();
		resto.password = bcrypt.hashSync(password, salt);
	}

	const userUpdated = await User.findByIdAndUpdate(id, resto, {
		returnOriginal: false,
	});
	if (userUpdated) {
		res.status(200).json({ msg: 'User updated successfully!', userUpdated });
	}
};

const deleteUser = async (req, res = response) => {
	const { id } = req.params;

	const userDeleted = await User.findByIdAndUpdate(
		id,
		{ status: false },
		{
			returnOriginal: false,
		}
	);

	res.status(200).json({
		msg: 'User deleted successfully',
	});
};

module.exports = {
	getUsers,
	getUser,
	newUser,
	updateUser,
	deleteUser,
};
