const User = require("../../db/models/user")

const GetUserLogin = async (req,res) =>{
    const {email,password} = req.body

    User.findOne({email}, async(err, data) => {

        if(err)
        {
            res.json({ msg: "error al obtener el cliente",err,access:false})
        }

        if(data)
        {

            if(data.validatePassword(password))
            {
                let {
                        address,
                        branch_office_id,
                        corner,
                        email,
                        first_name,
                        last_name,
                        neighborhood,
                        phone,
                        roles,
                        tuition,
                        vehicle,
                        _id
                } = data

                let datos = {
                    address,
                    branch_office_id,
                    corner,
                    email,
                    first_name,
                    last_name,
                    neighborhood,
                    phone,
                    roles,
                    tuition,
                    vehicle,
                    _id
                }


                res.json({ msg: "el cliente fue encontrado correctamente",datos,access:true})
            }
            else
            {
                res.json({ msg: "usuario o contraseña incorrecto",access:false})
            }

        }else
        {
            res.json({ msg: "usuario o contraseña incorrecto",access:false})
        }
    })
    
}

module.exports = {GetUserLogin}


// let datos = {
//     address,
//     branch_office_id,
//     corner,
//     email,
//     first_name,
//     last_name,
//     neighborhood,
//     phone,
//     roles,
//     tuition,
//     vehicle,
//     _id
// }


