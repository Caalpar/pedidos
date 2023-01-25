const express = require('express');
const { CreateUser,DeleteUser,GetUser,GetUsers,UpdateUser,GetUserLogin,SendMailAllUser } = require('../controllers/user');
const { UserExist } = require('../middleware');
const { CreateUserRoules } = require('../middleware/CreateUserRoules');
const { IsBranchOfficeAdmin } = require('../middleware/IsBranchOfficeAdmin');
const { IsCashier } = require('../middleware/IsCashier');
const { ValidUserData } = require('../middleware/validUserData');





const router = express.Router();


router.post('/login',GetUserLogin) 

router.post('/',[ValidUserData,CreateUserRoules,UserExist],CreateUser)  

router.post('/email',SendMailAllUser) // branch_office_id,subject,text,htmlText

router.put('/',[IsCashier],UpdateUser)

router.delete('/:_id/:user_id/:branch_office_id',[IsBranchOfficeAdmin],DeleteUser)

router.get('/all/:rol/:branch_office_id',GetUsers)

router.get('/:_id',GetUser)

module.exports = router;