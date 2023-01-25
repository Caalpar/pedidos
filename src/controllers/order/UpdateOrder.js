const Order = require("../../db/models/order.js")
const OnLineOrders = require('../../class/OnLineOreders.js')

const UpdateOrder = (req,res) =>{
    const {
        _id,
        order,
        description,
        cashier_id,
        id_delivery,
        description_cancel,
        state
    } =  req.body

    const date_update = new Date().getTime()

    Order.findById({_id:_id},(err,pedido)=>{
        if (err) {
            res.json({ msg: "error al actualizar la sucursal ", create: false,err })
        }

        if(pedido)
        {
            pedido.order              = order
            pedido.description        = description
            pedido.description_cancel = description_cancel
            pedido.state              = state
            pedido.date_update        = date_update

            if (cashier_id != '')
                pedido.cashier_id     = cashier_id
            if (id_delivery != '')
                pedido.id_delivery    = id_delivery
            
            pedido.save( async(err, order) => {

                if (err) {
                    res.json({ msg: "error al actualizar el pedido ", create: false,err })
        
                }
        
                if (order) {
                    let data = await Order.findById({_id:order._id}).populate('branch_office_id').populate('id_user').populate('id_delivery').populate('cashier_id').exec()
                    
                    if(data.state[0] == 'DELIVERED' || data.state[0] == 'CANCEL')
                    {
                        OnLineOrders.instance.orderToDelete(data._id,data.id_user._id)
                        OnLineOrders.instance.deleteOrder(data._id,data.id_user._id,data.branch_office_id._id)
                    }
                    else
                        OnLineOrders.instance.updateOrder(data,data.id_user._id,data.branch_office_id._id)

                    res.json({ msg: "el pedido fue actualizada correctamente", data, create: true })
                }
            })

        }


    })


}

module.exports = {UpdateOrder}
