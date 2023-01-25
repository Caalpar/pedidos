const Category = require("../../db/models/category")

const GetCategory = (req,res) =>{
    const {_id} = req.params

    Category.findOne({ _id: _id }, (err, data) => {

        if(err)
        {
            res.json({ msg: "error al obtener la categoria",err})
        }

        if(data)
        {
            res.json({ msg: "la categoria fue encontrada correctamente",data})
        }
    })
}

module.exports = {GetCategory}