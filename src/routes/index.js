const express = require('express');
const router = express.Router();

router.use('/business', require('./business.js'));
router.use('/branch_office', require('./branch_office.js'));
router.use('/order', require('./order.js'));
router.use('/user', require('./user.js'));
router.use('/product', require('./product.js'));
router.use('/category', require('./category.js'));





module.exports = router;