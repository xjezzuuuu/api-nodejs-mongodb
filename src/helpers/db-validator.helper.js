const User = require('../models/user.model');
const Role = require('../models/role.model');

const isValidRole = async (role = '') => {
	const roleExist = await Role.findOne({ name: role });
	if (!roleExist) {
		throw new Error(`This role ${role} not registered in the database`);
	}
};

const emailExist = async (email = '') => {
	const emailExist = await User.findOne({ email });
	if (emailExist) {
		throw new Error(`This email ${email} already exist!`);
	}
};

const userExistById = async (id) => {
	const userExist = await User.findById(id);
	if (!userExist) {
		throw new Error(`This id ${id} not found!`);
	}
};

module.exports = { isValidRole, emailExist, userExistById };
