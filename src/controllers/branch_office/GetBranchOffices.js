const BranchOffice = require("../../db/models/branch_office.js")

const GetBranchOffices = async (req,res) =>{


    const {business_id} = req.params

    let data = await BranchOffice.find({business_id}).exec()
    
    if(data)
    {
        res.json({ msg: "se encontraron correctamente las sucursales",data})
    }else
    {
        res.json({ msg: "no hay sucursales en esta empresa"})
    }
}

module.exports = {GetBranchOffices}