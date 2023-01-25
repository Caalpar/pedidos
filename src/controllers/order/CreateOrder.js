const Order = require("../../db/models/order.js")
const OnLineOrders = require('../../class/OnLineOreders.js')

const CreateOrder = async (req, res) => {

    const {
        order,
        branch_office_id,
        id_user,
        cashier_id ="",
        description,
        business_id,
    } =  req.body

    const date = new Date().getTime()
    const state = "RECEIVED"

    let data = await Order.find({branch_office_id}).exec()

    let oreder_number = 0

   

    if(data.length == 0)
        oreder_number = 1
    else{
        
        oreder_number = data[data.length-1].oreder_number + 1
        if(oreder_number > 100)
        oreder_number = 1
    }

    let dataOrder = {}
    
    if(cashier_id == '')
     dataOrder = {order,branch_office_id,business_id,date,id_user,oreder_number,description,description_cancel:'',state}
    else
     dataOrder = {order,branch_office_id,business_id,cashier_id,date,id_user,oreder_number,description,description_cancel:'',state}
  
    const new_Order = new Order(dataOrder)
    
    new_Order.save( async(err, data_order) => {
        if (err) {
            res.json({ msg: "error al crear el pedido", create: false,err })

        }

        if (data_order) {
            let data = await Order.findById({_id:data_order._id,branch_office_id}).populate('branch_office_id').populate('id_user').populate('id_delivery').populate('cashier_id').exec()
     
            OnLineOrders.instance.addOrder(data,data.id_user._id,data.branch_office_id._id)
            res.json({ msg: "el pedido fue creado correctamente", data, create: true })
        }
    })
}

module.exports = { CreateOrder }

