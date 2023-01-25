const User = require("../../db/models/user")

const GetUsers = async (req,res) =>{

    const {rol,branch_office_id} = req.params

    console.log({rol,branch_office_id})

    if(!branch_office_id)
    {
        res.json({ msg: "el cliente no existe",success : false})
    }else
    {
        let data = await User.find({roles:rol,branch_office_id}).exec()
        
        if(data)
        {
            res.json({ msg: "se encontraron correctamente los usuarios",data,success : true})
        }else
        {
            res.json({ msg: "el cliente no existe",success : false})
        }
    }



}

module.exports = {GetUsers}