const User = require("../db/models/user.js")


const IsAdmin = (req, res , next) => {

    let user_id  = req.body.user_id

    if(!user_id){
         user_id = req.params.user_id
    }

    User.findOne({ _id:user_id,roles:"ADMIN" }, (err, data) => {

        if(err)
            res.json({ msg: "error al obtener el cliente",err})
        else if(data)
            next()      
        else     
            res.json({ msg: "el usuario no tiene premisos para realizar esta accion",create:false})
        
    })
    




}

module.exports = { IsAdmin }