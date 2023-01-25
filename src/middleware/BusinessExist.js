const Business = require("../db/models/business.js")

const BusinessExist = (req, res , next) => {

    const { name } = req.body
    Business.findOne({ name }, (err, data) => {

        if(err)
        {
            res.json({ msg: "error al obtener la empresa",err})
        }

        if(data)
        {
            res.json({ msg: "ya hay una empresa registrada con este nombre", create:false})
        }
        else
        {
            next()
        }
    })
    




}

module.exports = { BusinessExist }