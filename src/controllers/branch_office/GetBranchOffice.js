const BranchOffice = require("../../db/models/branch_office.js")

const GetBranchOffice = (req,res) =>{
    const {_id} = req.params



    BranchOffice.findOne({ _id: _id }, (err, data) => {

        if(err)
        {
            res.json({ msg: "error al obtener la sucursal",err})
        }

        if(data)
        {
            res.json({ msg: "la sucursal fue encontrada correctamente",data})
        }
    })
}

module.exports = {GetBranchOffice}