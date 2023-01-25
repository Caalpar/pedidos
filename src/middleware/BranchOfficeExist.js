const BranchOffice = require("../db/models/branch_office.js")


const BranchOfficeExist = (req, res , next) => {

    const { business_id,name } = req.body
    BranchOffice.findOne({ business_id,name }, (err, data) => {

        if(err)
        {
            res.json({ msg: "error al crear la sucursal",err,create:false})
        }

        if(data)
        {
            res.json({ msg: "ya hay una sucurasl con este nombre en la empresa",create:false})
        }
        else
        {
            next()
        }
    })
    




}

module.exports = { BranchOfficeExist }