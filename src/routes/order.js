const express = require('express');
const { CreateOrder,DeleteOrder,GetOrders,GetOrder,UpdateOrder,GetReports,GetOrderByUser } = require('../controllers/order');
const { IsBranchOfficeAdmin } = require('../middleware/IsBranchOfficeAdmin');
const { IsCashier } = require('../middleware/IsCashier');
const { NewState } = require('../middleware/NewState');
const { isOpenBrancOffice } = require('../middleware/isOpenBrancOffice.js');
const { ValidOrderData } = require('../middleware/ValidOrderData');




const router = express.Router();

router.post('/',[ValidOrderData,isOpenBrancOffice],CreateOrder) // email,password 
router.get('/:_id',GetOrder)
router.get('/all/:branch_office_id',GetOrders)
router.get('/report/:user_id/:sience/:unitl',GetReports)
router.get('/client/:user_id',GetOrderByUser)
router.put('/',[IsCashier,NewState],UpdateOrder)
router.delete('/:_id',[IsBranchOfficeAdmin],DeleteOrder)

module.exports = router;