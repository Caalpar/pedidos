const User = require("../../db/models/user")


const CreateUser = (req, res) => {

    const { email, first_name,phone, last_name, branch_office_id, password, rol, address, neighborhood, corner, tuition, vehicle } = req.body
    const new_user = new User()

    new_user.email            =    email,
    new_user.first_name       =    first_name,
    new_user.last_name        =    last_name,
    new_user.phone            =    phone,
    new_user.branch_office_id =    branch_office_id,
    new_user.password         =    new_user.generateHash(password),
    new_user.roles            =    rol || ["CUSTOMER"],
    new_user.address          =    address,
    new_user.neighborhood     =    neighborhood,
    new_user.corner           =    corner,
    new_user.tuition          =    tuition,
    new_user.vehicle          =    vehicle
        
    new_user.save((err, data) => {
        if (err) {
            res.json({ msg: "error al crear el usuario", create: false,err })

        }

        if (data) {
            
            res.json({ msg: "el cliente fue creado correctamente", data, create: true })
        }
    })

}

module.exports = { CreateUser }


