const User = require("../db/models/user.js")


const UserExist = (req, res , next) => {

    const { email,branch_office_id } = req.body
    User.findOne({ email,branch_office_id }, (err, data) => {

        if(err)
        {
            res.json({ msg: "error al obtener el cliente",err})
        }

        if(data)
        {
            res.json({ msg: "ya hay un cliente registrado con este mail",create:false})
        }
        else
        {
            next()
        }
    })
    




}

module.exports = { UserExist }