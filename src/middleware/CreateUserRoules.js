const User = require("../db/models/user.js")
const BranchOffice = require('../db/models/branch_office.js')


const CreateUserRoules = (req, res , next) => {

    let user_id  = req.body.user_id
    let rol = req.body.rol
    let branch_office_id = req.body.branch_office_id

    if(!user_id)
         user_id = req.params.user_id
        
    if(!rol)
         rol = req.params.rol
    
    if(!branch_office_id)
         branch_office_id = req.params.branch_office_id
    
    console.log('data',req.body)

    console.log('rol',rol)

    if(rol == 'CUSTOMER'){
        next()
    }
    else if(rol == 'ADMIN')
    {
        res.json({ msg: "error al crear el cliente",create:false})
    }
    else
    {
        User.findOne({ _id:user_id }, async (err, user) => {

            if(err)
            {
                res.json({ msg: "error al crear el cliente",err,create:false})
            }

            if(user)
            {
              
               if(user.roles[0] == 'ADMIN')
               {
                next()
               }
               else if(user.roles[0] == 'BUSINESS_ADMIN')
               {
                    //busco el id_bussines con el branch_office_id del usuario que va a crear
                    let id_bussines_current = await BranchOffice.findOne({_id: user.branch_office_id}).exec()
                    
                    //busco el id_bussines con el branch_office_id del usuario nuevo 
                    let id_bussines_new_user = await BranchOffice.findOne({_id: branch_office_id}).exec()
                    
                    //comparo el id_bussines del usuario creador con el nuevo usuario

                    console.log(id_bussines_new_user.business_id.toString(),id_bussines_current.business_id.toString())

                    if(id_bussines_current.business_id.toString() == id_bussines_new_user.business_id.toString())
                    {
                        next()
                    }
                    // si son iguales dejo segui, si no envio el error 
                    else
                    {
                        res.json({ msg: "el usuario no tiene premisos para realizar esta accion",create:false})
                    }
               }
               
    // [,'BRANCH_OFFICE_ADMIN','CASHIER', 'DELIVERY','CUSTOMER']
               else if(user.roles[0] == 'BRANCH_OFFICE_ADMIN')
               {
                    if(rol == 'BUSINESS_ADMIN' || rol == 'BRANCH_OFFICE_ADMIN')
                    {
                        res.json({ msg: "error al crear el cliente",create:false})
                    }
                    else if(user.branch_office_id == branch_office_id)
                    {
                        next()
                    }
                    else
                    {
                        res.json({ msg: "error al crear el cliente",create:false}) 
                    }
               }
               else 
               {
                    res.json({ msg: "error al crear el cliente",create:false})  
               }

            
            }
            else
            {
                res.json({ msg: "el usuario no tiene premisos para realizar esta accion",create:false})
            }
        })
    }




}

module.exports = { CreateUserRoules }