const express = require('express');
const { CreateBranchOffice,DeleteBranchOffice,GetBranchOffice,GetBranchOffices,UpdateBranchOffice } = require('../controllers/branch_office');
const { BranchOfficeExist } = require('../middleware/BranchOfficeExist');
const { BusinessNotExist } = require('../middleware/BusinessNotExist');
const { IsBusinessAdmin } = require('../middleware/IsBusinessAdmin');
const { IsAdmin } = require('../middleware/IsAdmin');



BranchOfficeExist
const router = express.Router();


router.post('/',[IsBusinessAdmin,BusinessNotExist,BranchOfficeExist],CreateBranchOffice) 
router.get('/:_id',GetBranchOffice) 
router.get('/all/:user_id/:business_id/:branch_office_id',[IsBusinessAdmin],GetBranchOffices) 
router.put('/',[IsBusinessAdmin],UpdateBranchOffice)// email,password 
router.delete('/:_id/:user_id/:branch_office_id',[IsBusinessAdmin],DeleteBranchOffice) 


module.exports = router;    