const Order = require("../../db/models/order.js")

const DeleteOrder = async (req,res) =>{

    const {_id} = req.params

    let {deletedCount} = await Order.deleteOne({_id:_id})
    
    if(deletedCount > 0)
    {
        res.json({ msg: "el pedido fue borrado correctamente"})
    }else
    {
        res.json({ msg: "el pedido no existe"})
    }

}

module.exports = {DeleteOrder}