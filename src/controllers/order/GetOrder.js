const Order = require("../../db/models/order.js")

const GetOrder = (req,res) =>{
    
    const {_id} = req.params

    Order.findOne({ _id: _id }, (err, data) => {

        if(err)
        {
            res.json({ msg: "error al obtener el pedido",err})
        }

        if(data)
        {
            res.json({ msg: "el pedido fue encontrado correctamente",data})
        }
    })

}

module.exports = {GetOrder}