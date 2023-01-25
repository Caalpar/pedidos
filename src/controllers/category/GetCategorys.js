const Category = require("../../db/models/category")

const GetCategorys = async (req,res) =>{
    const {branch_office_id} = req.params

    let data = await Category.find({branch_office_id}).exec()
    
    if(data)
    {
        res.json({ msg: "se encontraron correctamente las categorias",data})
    }else
    {
        res.json({ msg: "no hay categorias en esta sucursal"})
    }
}

module.exports = {GetCategorys}