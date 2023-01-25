const Product = require("../../db/models/product.js")
const {DeleteImg,OptimizePhoto} = require('../../tools/OptimizePhoto.js')

const UpdatePrduct = (req,res) =>{

    const { _id,
        price,
        cost,
        description,
        title,
        availbility,
        front_page,
        category_id
    } = req.body


    Product.findById({_id:_id},(err,product)=>{
        if (err) {
            res.json({ msg: "error al actualizar la sucursal ", create: false,err })
        }

        if(product)
        {
            let img_delete = product.img
            
            product.price = price
            product.cost = cost
            product.description = description
            product.title = title
            product.availbility = availbility
            product.front_page = front_page
            product.category_id = category_id


            if(req.file && req.file.filename){
                OptimizePhoto(req.file,product._id)
                let arrIMG = req.file.filename.split(".")
                let extencion  = arrIMG[arrIMG.length -1]                 
                product.img = product._id +'.'+extencion
            }


            product.save((err, data) => {

                if (err) {
                    res.json({ msg: "error al actualizar el producto ", create: false,err })
        
                }
        
                if (data) {
                    if(req.file && req.file.filename)
                         DeleteImg('../assets/imgs/',img_delete,'sin_foto.png')
                    res.json({ msg: "el producto fue actualizado correctamente", data, create: true })
                }
            })

        }


    })


}

module.exports = {UpdatePrduct}