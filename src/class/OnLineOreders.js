
class OnLineOrders{

    static instance
    constructor(){

        this.ordersByUsers = new Map()
        this.ordersByBranch = new Map()
        this.ordersToDelete = new Map()

        // patron sigleton
        if (typeof OnLineOrders.instance == "object") {
            return OnLineOrders.instance
        }
        OnLineOrders.instance = this
        return this
    }

    addOrder(order,user_id,branch_office_id)
    {
        let dataUser = this.ordersByUsers.get(user_id.toString())

        if(dataUser) this.ordersByUsers.set(user_id.toString(),[...dataUser,order])
        else this.ordersByUsers.set(user_id.toString(),[order])
       
        let dataBranch = this.ordersByBranch.get(branch_office_id.toString())


        if(dataBranch) this.ordersByBranch.set(branch_office_id.toString(),[...dataBranch,order])
        else this.ordersByBranch.set(branch_office_id.toString(),[order])
    }


    
    updateOrder(order,user_id,branch_office_id){
        let data = this.ordersByUsers.get(user_id.toString())

        if(data)
        {

         
            let index = data.findIndex(ord => ord._id.toString() == order._id.toString())
            if(index!=-1){
                data[index] = order
                this.ordersByUsers.set(user_id.toString(),data)
            }
        }
  
       let dataBranchOffice = this.ordersByBranch.get(branch_office_id.toString())
        if(dataBranchOffice)
        {
            
            let index = dataBranchOffice.findIndex(ord => ord._id.toString() == order._id.toString())
            if(index!=-1){
                dataBranchOffice[index] = order
                this.ordersByBranch.set(branch_office_id.toString(),dataBranchOffice)
            }
        }

        if(!dataBranchOffice && !data)
            return -1
    }

    getOrdersByUser(user_id){ return this.ordersByUsers.get(user_id.toString()) }
    
    getOrdersByBranchOffice(branch_office_id){ return this.ordersByBranch.get(branch_office_id.toString()) }

    deleteOrder(order_id,user_id,branch_office_id){

        let data = this.ordersByUsers.get(user_id.toString())

        if(data)
        {
            let index = data.findIndex(order => order._id.toString() == order_id.toString())
            if(index!=-1){
                data.splice(index,1)

                if(data.length>0)
                this.ordersByUsers.set(user_id.toString(),data)
                else
                this.ordersByUsers.delete(user_id.toString())
            }
        }
  
       
       let dataBranchOffice = this.ordersByBranch.get(branch_office_id.toString())

        if(dataBranchOffice)
        {
            let index = dataBranchOffice.findIndex(order => order._id.toString() == order_id.toString())
            if(index!=-1){
                dataBranchOffice.splice(index,1)

                if(dataBranchOffice.length>0)
                    this.ordersByBranch.set(branch_office_id.toString(),dataBranchOffice)
                else
                    this.ordersByBranch.delete(branch_office_id.toString())
            }
        }

   
        if(!dataBranchOffice && !data)
            return -1

    }

    // lista de ordenes para eliminar en los clientes
    orderToDelete(order_id,user_id)
    {
      
        let data= this.ordersToDelete.get(user_id.toString())
        if(data) this.ordersToDelete.set(user_id.toString(),[...data,order_id])
        else this.ordersToDelete.set(user_id.toString(),[order_id])
       // console.log('add data to delete', this.ordersToDelete.get(user_id.toString()))
    }
    //obtener las ordenes a eliminar para enviarselas al cliente
    getOrdersToDelete(user_id){  
         return this.ordersToDelete.get(user_id.toString())  
        }

    // una vez enviado a los clientes las ordenes a borrar se borran del server
    deleteOrderToDelete(order_id,user_id){

        let data = this.ordersToDelete.get(user_id.toString())

        if(data)
        {
            let index = data.findIndex(order => order == order_id.toString())
            if(index!=-1){
                data.splice(index,1)

                if(data.length>0)
                this.ordersToDelete.set(user_id.toString(),data)
                else
                this.ordersToDelete.delete(user_id.toString())
            }
        }
     
        if(!data)
            return -1
    }
}
module.exports = OnLineOrders;


