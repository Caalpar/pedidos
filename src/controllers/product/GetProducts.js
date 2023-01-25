const Product = require("../../db/models/product.js")

const GetProducts = async (req,res) =>{
    const {branch_office_id} = req.params

    let data = await Product.find({branch_office_id}).populate('category_id').exec()
    
    if(data)
    {
        res.json({ msg: "se encontraron correctamente los productos",data})
    }else
    {
        res.json({ msg: "no hay productos en esta sucursal"})
    }



}

module.exports = {GetProducts}