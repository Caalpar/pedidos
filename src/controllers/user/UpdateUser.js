const User = require("../../db/models/user")

const UpdateUser = (req,res) =>{

    const {_id,email,phone,first_name,last_name,address,neighborhood,corner,tuition,vehicle} =  req.body

    User.findById({_id},(err,user)=>{
        
        if (err) {
            res.json({ msg: "error al actualizar el cliente", login: false,err })
        }

        if(user){
            try {
                           
                user.email            =    email,
                user.first_name       =    first_name,
                user.last_name        =    last_name,
                user.phone            =    phone,
                user.address          =    address,
                user.neighborhood     =    neighborhood,
                user.corner           =    corner,
                user.tuition          =    tuition,
                user.vehicle          =    vehicle
                    
                user.save((err, data) => {
                    if (err) {
                        res.json({ msg: "error al actualizar el cliente", update: false, err })
                    }
            
                    if (data) {
                        res.json({ msg: "el cliente fue actualizado correctamente", data, update: true })
                    }
                })
            } catch (error) {
                res.json({ msg: "error al actualizar el cliente", update: false, error })
            }
        }

    })






}

module.exports = {UpdateUser}