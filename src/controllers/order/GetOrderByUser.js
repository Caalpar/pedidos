const Order = require("../../db/models/order.js")

const GetOrderByUser = async (req,res) =>{
    
    const {user_id} = req.params
    
    console.log('buscando el usuario',user_id)

    try {

        let data = await Order.find({ id_user: user_id,$or: [{state:"RECEIVED"},{state:"PROCESS"},{state:"COMING"}]}).populate('id_delivery').populate('id_user').exec()

        if(data)
        {
            res.json({ msg: "el pedido fue encontrado correctamente",data})
        }
        
    } catch (err) {  
        res.json({ msg: "error al obtener el pedido",err})
    }
}

module.exports = {GetOrderByUser}