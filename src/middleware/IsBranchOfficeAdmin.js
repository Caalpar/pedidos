const User = require("../db/models/user.js")
const BranchOffice = require('../db/models/branch_office.js')


const IsBranchOfficeAdmin = (req, res , next) => {

    let user_id  = req.body.user_id
    let branch_office_id = req.body.branch_office_id

    if(!user_id){
         user_id = req.params.user_id
    }
    if(!branch_office_id){
        branch_office_id = req.params.branch_office_id
    }
    
    User.findOne({ _id:user_id , $or: [{roles:"ADMIN"},{roles:"BUSINESS_ADMIN"},{roles:"BRANCH_OFFICE_ADMIN"}]}, async (err, data) => {

        if(err)     
            res.json({ msg: "error al obtener el cliente",err})
        
        if(data)
        {
            if(data.roles[0] == "ADMIN")
                next()       
            else if(data.roles[0] == "BUSINESS_ADMIN")
            {
                //busco el id_bussines con el branch_office_id del usuario que va a crear
                let id_bussines_current = await BranchOffice.findOne({_id: data.branch_office_id}).exec()
    
                console.log({branch_office_id})
                //busco el id_bussines con el branch_office_id del usuario nuevo 
                let id_bussines_new_user = await BranchOffice.findOne({_id: branch_office_id}).exec()
                
                //comparo el id_bussines del usuario creador con el nuevo usuario
                if(id_bussines_current.business_id.toString() == id_bussines_new_user.business_id.toString())  
                    next()
                else  
                    res.json({ msg: "el usuario no tiene premisos para realizar esta accion",create:false})          
            }
            else if(branch_office_id == data.branch_office_id)
                next()         
            else  
             res.json({ msg: "el usuario no tiene premisos para realizar esta accion",create:false})
        }
        else 
            res.json({ msg: "el usuario no tiene premisos para realizar esta accion",create:false})
        
    })
    




}

module.exports = { IsBranchOfficeAdmin }