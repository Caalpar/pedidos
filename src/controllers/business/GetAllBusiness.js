const Business = require("../../db/models/business.js")

const GetAllBusiness = async (req,res) =>{

    let data = await Business.find().exec()
    
    if(data)
    {
        res.json({ msg: "se encontraron correctamente las empresas",data})
    }else
    {
        res.json({ msg: "no se a podido encontrar las empresas"})
    }
    



}

module.exports = {GetAllBusiness}