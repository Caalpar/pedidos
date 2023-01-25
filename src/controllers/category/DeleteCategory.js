const Category = require("../../db/models/category")

const DeleteCategory = async (req,res) =>{

    const {_id} = req.params

    let {deletedCount} = await Category.deleteOne({_id:_id})
    
    if(deletedCount > 0)
    {
        res.json({ msg: "la categoria fue borrada correctamente"})
    }else
    {
        res.json({ msg: "la categoria no existe"})
    }

}

module.exports = {DeleteCategory}