
const Order = require("../db/models/order.js")


const NewState = async (req, res , next) => {

    const { _id,state } = req.body
    Order.findOne({_id:_id}, (err, data) => {

        if(err)
        {
            res.json({ msg: "error al cambiar el estado del pedido",err,update:false})
        }

        if(data)
        {
            let currentState = data.state[0]

           if(currentState == 'RECEIVED' && (state == 'CANCEL' || state == 'PROCESS' || state == 'RECEIVED')){
            next()
           }
           else if(currentState == 'PROCESS' && (state == 'CANCEL' || state == 'COMING' || state == 'PROCESS')){
            next()
           }
           else if(currentState == 'COMING' && (state == 'CANCEL' || state == 'DELIVERED')){
            next()
           }
           else if(currentState == 'DELIVERED' && state == 'CANCEL'){
            next()
           }
           else if(currentState == 'CANCEL'){
            res.json({ msg: "no se pudo cambiar el estado del pedido", update:false})
           }
           else
           {
             res.json({ msg: "no se pudo cambiar el estado del pedido", update:false})
           }
        }
        else
        {
            res.json({ msg: "la orden no existe", update:false})
        }
    })
    




}

module.exports = { NewState }