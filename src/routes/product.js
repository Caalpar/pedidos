const express = require('express');
const { CreateProduct,DeleteProduct,GetProduct,GetProducts,UpdatePrduct,GetImage} = require('../controllers/product');
const { BranchOfficeNotExist } = require('../middleware/BranchOfficeNotExist');

const { CategoryNotExist } = require('../middleware/CategoryNotExist');
const { IsBranchOfficeAdmin } = require('../middleware/IsBranchOfficeAdmin');
const { ProductExist } = require('../middleware/ProductExist');
const upload = require('../multer/index.js')


const router = express.Router();



router.post('/',[upload.single('imge'),IsBranchOfficeAdmin,BranchOfficeNotExist,CategoryNotExist,ProductExist],CreateProduct)
router.get('/:_id',GetProduct)
router.get('/all/:branch_office_id',GetProducts)
router.get('/img/:name',GetImage)
router.put('/',[upload.single('imge'),IsBranchOfficeAdmin],UpdatePrduct)
router.delete('/:_id/:user_id/:branch_office_id',[IsBranchOfficeAdmin],DeleteProduct)

module.exports = router;