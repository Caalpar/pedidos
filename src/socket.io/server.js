const customEvent = require('../events/events')
const OnLineOrders = require('../class/OnLineOreders.js')

let Server = undefined

// ejemplo para enviar a todos los clientes
customEvent.on('event-name', (data) => {
    if (typeof Server != 'undefined') {
        Server.emit('event-name-socekt-io', data)
    }
})

module.exports = (ServerIO) => {

    Server = ServerIO

    ServerIO.on('connection', (socket) => {
        console.log('a user connected ' + socket.id);

        socket.on('branch-office-orders',({branch_office_id,numberOfOrders})=>{

            if(branch_office_id){
                let OrdersInServer = OnLineOrders.instance.getOrdersByBranchOffice(branch_office_id)

                if(OrdersInServer?.length && (numberOfOrders != OrdersInServer.length))
                {
                    socket.emit('branch-office-orders',OrdersInServer)
                }
            }

        })

        socket.on('client-orders',({client_id,Orders})=>{


            if(client_id){

                let OrdersInServer = OnLineOrders.instance.getOrdersByUser(client_id)
    
             
    
                if(OrdersInServer?.length && Orders.length != OrdersInServer.length)
                {
                    socket.emit('client-orders',OrdersInServer)
                }
    
                if(OrdersInServer?.length)
                {
    
                    let update = false
                    for (let index = 0; index < Orders.length; index++) {
                        const ord = Orders[index];
                        let index_ord = OrdersInServer.findIndex(o => o._id == ord._id)
    
                        if(index_ord != -1 && (ord.state[0] != OrdersInServer[index_ord].state[0]))
                        {
                            update = true
                            break;
                        }
                    }
    
                    if(update){
                        socket.emit('client-orders', OrdersInServer)
                    }
                }
    
                let OredersToDelete = OnLineOrders.instance.getOrdersToDelete(client_id)

                if(OredersToDelete)
                {
                    socket.emit('client-orders-delete', OredersToDelete)

                    for (let index = 0; index < OredersToDelete.length; index++) {
                        const ord = OredersToDelete[index];
                        OnLineOrders.instance.deleteOrderToDelete(ord,client_id)
                        
                    }
                }
            }
        })
    })
}

