const Business = require("../db/models/business.js")


const BusinessNotExist = (req, res , next) => {

    const { business_id } = req.body
    Business.findOne({ _id:business_id }, (err, data) => {

        if(err)
        {
            res.json({ msg: "error al obtener la empresa",err,create:false})
        } 
        else if(data)
        {
            next()  
        }
        else
        {
            res.json({ msg: "no hay una empresa registrada con este nombre", create:false})
        }
    })
    




}

module.exports = { BusinessNotExist }