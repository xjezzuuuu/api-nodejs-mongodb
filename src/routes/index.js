const { Router } = require('express');
const router = Router();

router.use('/users', require('./users.routes'));
router.use('/products', require('./products.routes'));

module.exports = router;
