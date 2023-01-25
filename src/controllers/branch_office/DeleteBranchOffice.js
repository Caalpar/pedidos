const BranchOffice = require("../../db/models/branch_office.js")

const DeleteBranchOffice = async (req,res) =>{
    const {_id} = req.params



    let {deletedCount} = await BranchOffice.deleteOne({_id:_id})
    
    if(deletedCount > 0)
    {
        res.json({ msg: "la sucursal fue borrada correctamente"})
    }else
    {
        res.json({ msg: "la sucursal no existe"})
    }
}

module.exports = {DeleteBranchOffice}