const Category = require("../db/models/category.js")


const CategoryNotExist = (req, res , next) => {



    const { category_id } = req.body



    Category.findOne({ _id:category_id }, (err, data) => {

        if(err)
        {
            res.json({ msg: "error al obtener la categoria",err})
        }

        if(data)
        {
            next()    
        }
        else
        {
            res.json({ msg: "no hay una categoria registrada con este nombre", create:false})
        }
    })
    




}

module.exports = { CategoryNotExist }