const Product = require("../../db/models/product.js")
const {OptimizePhoto} = require("../../tools/OptimizePhoto.js")

const CreateProduct = (req, res) => {

    let img = req.file?.filename || 'sin_foto.png'

    const { 
        price,
        description,
        title,
        availbility,
        front_page,
        branch_office_id,
        category_id
    } = req.body

    let cost = price * 0.75
    console.log(cost)
   
    if(req.body.cost != 'undefined'){
        console.log(req.body)
        cost = req.body.cost
    }

    const new_Product = new Product({
        price,
        cost,
        description,
        title,
        img,
        availbility,
        front_page,
        branch_office_id,
        category_id
    })

    new_Product.save(async (err, product) => {
        if (err) {
            res.json({ msg: "error al crear el producto", create: false, err })

        }

        if (product) {

            if(img != 'sin_foto.png')
            {
                let arrIMG = img.split(".")
                let extencion  = arrIMG[arrIMG.length -1]                 
                img =  product._id +'.'+extencion
                product.img = img
                await product.save()
            }

            let data = await Product.findById({_id:product._id}).populate('category_id').exec()

            await OptimizePhoto(req.file,product._id)

            data.img = img 

            res.json({ msg: "la producto fue creado correctamente", data, create: true })
        }
    })
}

module.exports = { CreateProduct }

