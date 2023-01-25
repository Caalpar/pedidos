const Category = require("../../db/models/category")

const UpdateCategory = (req,res) =>{

    const { _id,name} = req.body


    Category.findById({_id:_id},(err,cartegory)=>{
        if (err) {
            res.json({ msg: "error al actualizar la sucursal ", create: false,err })
        }

        if(cartegory)
        {
            cartegory.name = name
            cartegory.save((err, data) => {

                if (err) {
                    res.json({ msg: "error al actualizar la categoria ", create: false,err })
        
                }
        
                if (data) {
                    res.json({ msg: "la categoria fue actualizada correctamente", data, create: true })
                }
            })

        }


    })


}

module.exports = {UpdateCategory}