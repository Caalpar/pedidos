const express = require('express');
const { CreateCategory,DeleteCategory,GetCategory,GetCategorys,UpdateCategory } = require('../controllers/category');
const { CategoryExist } = require('../middleware/CategoryExist');
const { IsBranchOfficeAdmin } = require('../middleware/IsBranchOfficeAdmin');

const router = express.Router();

router.post('/',[IsBranchOfficeAdmin,CategoryExist],CreateCategory) 
router.get('/:_id',GetCategory) 
router.get('/all/:branch_office_id',GetCategorys) 
router.put('/',[IsBranchOfficeAdmin,CategoryExist],UpdateCategory)// email,password 
router.delete('/:_id/:user_id/:branch_office_id',[IsBranchOfficeAdmin],DeleteCategory) 

module.exports = router;