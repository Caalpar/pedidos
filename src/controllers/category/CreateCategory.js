const Category = require("../../db/models/category")

const CreateCategory = (req,res) =>{
    const { name,branch_office_id } = req.body
    const new_Category = new Category({name,branch_office_id})
        
    new_Category.save((err, data) => {
        if (err) {
            res.json({ msg: "error al crear la categoria", create: false,err })

        }

        if (data) {
            res.json({ msg: "la categoria fue creada correctamente", data, create: true })
        }
    })
}

module.exports = {CreateCategory}