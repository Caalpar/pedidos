const Order = require("../../db/models/order.js")

const GetOrders = async (req,res) =>{

    const {branch_office_id} = req.params

    let data = await Order.find({branch_office_id,$or: [{state:"RECEIVED"},{state:"PROCESS"},{state:"COMING"}]}).populate('branch_office_id').populate('id_user').populate('id_delivery').populate('cashier_id').exec()
    
    if(data)
    {
        res.json({ msg: "se encontraron correctamente los pedidos",data})
    }else
    {
        res.json({ msg: "no hay pedidos en esta sucursal"})
    }

}

module.exports = {GetOrders}
