const { check } = require('express-validator');

const { isValidRole, emailExist, userExistById } = require('./db-validator.helper');

const getUsersValidator = [
	// check('limit', 'This limit must be a number').isNumeric(),
	// check('till', 'This till must be a number').isNumeric(),
];

const getUserValidator = [check('id').custom(userExistById)];

const newUserValidator = [
	check('name', 'Name is required!').not().isEmpty(),
	check('email', 'This not format at email').isEmail().custom(emailExist),
	check('password', 'Password min lenght is 6 letters').isLength({ min: 6 }),
	// check('role', 'Not is one role valid').isIn('ADMIN_ROLE', 'USER_ROLE'),
	check('role').custom(isValidRole),
];

const updateUserValidator = [
	check('id', 'This id is not at valid id').isMongoId(),
	check('id').custom(userExistById),
	check('role').custom(isValidRole),
];

const deleteUserValidator = [check('id', 'This id is not at valid id').isMongoId(), check('id').custom(userExistById)];

module.exports = { getUsersValidator, getUserValidator, newUserValidator, updateUserValidator, deleteUserValidator };
