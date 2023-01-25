const User = require("../../db/models/user")

const GetUser = async (req,res) =>{
    const {_id} = req.params

    User.findOne({ _id: _id }, (err, data) => {

        if(err)
        {
            res.json({ msg: "error al obtener el cliente",err,access:false})
        }

        if(data)
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
    })
    



}

module.exports = {GetUser}