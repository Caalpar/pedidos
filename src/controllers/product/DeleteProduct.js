const Product = require("../../db/models/product.js")
const {DeleteImg} = require("../../tools/OptimizePhoto.js")

const DeleteProduct = async (req,res) =>{
    const {_id} = req.params

    let product = await Product.findById({_id:_id}).exec()

    let {deletedCount} = await Product.deleteOne({_id:_id})
    


    if(deletedCount > 0)
    {

        DeleteImg('../assets/imgs/',product.img,'sin_foto.png')

        res.json({ msg: "el producto fue borrado correctamente"})
    }else
    {
        res.json({ msg: "el producto no existe"})
    }
}

module.exports = {DeleteProduct}