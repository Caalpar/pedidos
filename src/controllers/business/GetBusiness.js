const Business = require("../../db/models/business.js")

const GetBusiness = async (req,res) =>{

    const {_id} = req.params

    Business.findOne({ _id: _id }, (err, data) => {

        if(err)
        {
            res.json({ msg: "error al obtener la empresa",err})
        }

        if(data)
        {
            res.json({ msg: "la empresa fue encontrada correctamente",data})
        }
    })
    



}

module.exports = {GetBusiness}