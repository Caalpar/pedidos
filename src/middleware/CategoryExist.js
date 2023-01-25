const Category = require("../db/models/category.js")


const CategoryExist = (req, res , next) => {

    const { name,branch_office_id } = req.body
    Category.findOne({ name,branch_office_id}, (err, data) => {

        if(err)
        {
            res.json({ msg: "error al obtener la categoria",err})
        }

        if(data)
        {

            
            res.json({ msg: "ya hay una categoria registrada con este nombre", create:false})
        }
        else
        {
            next()
        }
    })
    




}

module.exports = { CategoryExist }