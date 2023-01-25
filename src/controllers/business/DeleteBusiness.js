const Business = require("../../db/models/business.js")
const {DeleteImg} = require("../../tools/OptimizePhoto.js")

const DeleteBusiness = async (req,res) =>{
    const {_id} = req.params

    let business = await Business.findById({_id:_id}).exec()

    let {deletedCount} = await Business.deleteOne({_id:_id})
    
    if(deletedCount > 0)
    {
        DeleteImg('../assets/imgs/',business.img,'sin_foto.png')
        res.json({ msg: "la sucursal fue borrada correctamente"})
    }else
    {
        res.json({ msg: "la sucursal no existe"})
    }
}

module.exports = {DeleteBusiness}