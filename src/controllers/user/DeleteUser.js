
const User = require("../../db/models/user")

const DeleteUser = async (req,res) =>{
    const {_id} = req.params

    let {deletedCount} = await User.deleteOne({_id:_id})
    
    if(deletedCount > 0)
    {
        res.json({ msg: "el cliente fue borrado correctamente"})
    }else
    {
        res.json({ msg: "el cliente no existe"})
    }

}

module.exports = {DeleteUser}