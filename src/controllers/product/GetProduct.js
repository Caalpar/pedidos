const Product = require("../../db/models/product.js")

const GetProduct = (req,res) =>{

    const {_id} = req.params

    Product.findOne({ _id: _id }, (err, data) => {

        if(err)
        {
            res.json({ msg: "error al obtener el producto",err})
        }

        if(data)
        {
            res.json({ msg: "el producto fue encontrado correctamente",data})
        }
    })



}

module.exports = {GetProduct}