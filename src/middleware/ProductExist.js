const Product = require("../db/models/product.js")


const ProductExist = (req, res , next) => {

    const { price,description,title } = req.body
    Product.findOne({ price,description,title }, (err, data) => {

        if(err)
        {
            res.json({ msg: "error al obtener el producto",err})
        }

        if(data)
        {
            res.json({ msg: "ya hay un productor registrado con estas caracteristicas", create:false})
        }
        else
        {
            next()
        }
    })
    




}

module.exports = { ProductExist }