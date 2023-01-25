const BranchOffice = require("../db/models/branch_office.js")


const BranchOfficeNotExist = (req, res , next) => {

   

    const { branch_office_id } = req.body


    BranchOffice.findOne({ _id:branch_office_id }, (err, data) => {

        if(err)
        {
           // res.json({ msg: "error al buscar la sucursal",err,create:false})
        }

        if(data)
        {
            next()
        }
        else
        {
            console.log("no se ah encontrado la sucursal")
          //  res.json({ msg: "no se ah encontrado la sucursal",create:false})
        }
    })
    




}

module.exports = { BranchOfficeNotExist }