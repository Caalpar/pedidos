const express = require('express');
const { CreateBusiness,GetBusiness,GetAllBusiness,DeleteBusiness,UpdateBusiness } = require('../controllers/business');
const router = express.Router();
const { BusinessExist} = require('../middleware/BusinessExist.js');
const { IsAdmin } = require('../middleware/IsAdmin');
const upload = require('../multer/index.js')


router.post('/',[upload.single('imge'),IsAdmin,BusinessExist],CreateBusiness) 
router.get('/:_id',GetBusiness) 
router.get('/all/:user_id',[IsAdmin],GetAllBusiness) 
router.delete('/:_id/:user_id',[IsAdmin],DeleteBusiness) 
router.put('/',[upload.single('imge'),IsAdmin],UpdateBusiness)

module.exports = router;