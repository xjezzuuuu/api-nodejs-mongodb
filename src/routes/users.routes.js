const { Router } = require('express');

const {
	getUsersValidator,
	getUserValidator,
	newUserValidator,
	updateUserValidator,
	deleteUserValidator,
} = require('../helpers/users.helper');
const { getUsers, getUser, newUser, updateUser, deleteUser } = require('../controllers/users.controller');
const { validFields } = require('../middlewares/validate-fields.middleware');

const router = Router();

router.get('/', getUsersValidator, validFields, getUsers);

router.get('/:id', getUserValidator, validFields, getUser);

router.post('/', newUserValidator, validFields, newUser);

router.put('/:id', updateUserValidator, validFields, updateUser);

router.delete('/:id', deleteUserValidator, validFields, deleteUser);

module.exports = router;
