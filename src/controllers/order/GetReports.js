const Order = require("../../db/models/order.js")
const User = require("../../db/models/user.js")
const BranchOffice = require("../../db/models/branch_office.js")

const GetReports = async (req,res) =>{

    const {user_id,sience,unitl} = req.params

    let user  = await User.findById({_id:user_id}).exec()

    if(user.roles[0] == 'ADMIN')
    {
        let data = await Order.find({$and:[{date:{$gte:sience}},{date:{$lte:unitl}}],$or: [{state:"DELIVERED"},{state:"CANCEL"}]}).populate('business_id').populate('branch_office_id').populate('id_user').populate('id_delivery').populate('cashier_id').exec()

        if(data)
        {
            res.json({ msg: "se encontraron correctamente los pedidos",data})
        }else
        {
            res.json({ msg: "no hay pedidos en esta sucursal"})
        }
    }
    else if(user.roles[0] == 'BUSINESS_ADMIN')
    {
        let branchOffice =  await BranchOffice.findById({_id:user.branch_office_id}).exec()
        let data = await Order.find({business_id:branchOffice.business_id,$and:[{date:{$gte:sience}},{date:{$lte:unitl}}],$or: [{state:"DELIVERED"},{state:"CANCEL"}]}).populate('business_id').populate('branch_office_id').populate('id_user').populate('id_delivery').populate('cashier_id').exec()
        if(data)
        {
            res.json({ msg: "se encontraron correctamente los pedidos",data})
        }else
        {
            res.json({ msg: "no hay pedidos en esta sucursal"})
        }
    }
    else if(user.roles[0] == 'BRANCH_OFFICE_ADMIN')
    {
        let data = await Order.find({branch_office_id:user.branch_office_id,$and:[{date:{$gte:sience}},{date:{$lte:unitl}}],$or: [{state:"DELIVERED"},{state:"CANCEL"}]}).populate('business_id').populate('branch_office_id').populate('id_user').populate('id_delivery').populate('cashier_id').exec()
        if(data)
        {
            res.json({ msg: "se encontraron correctamente los pedidos",data})
        }else
        {
            res.json({ msg: "no hay pedidos en esta sucursal"})
        }
    }
    else if(user.roles[0] == 'CASHIER')
    {
        let data = await Order.find({branch_office_id:user.branch_office_id,cashier_id:user._id,$and:[{date:{$gte:sience}},{date:{$lte:unitl}}],$or: [{state:"DELIVERED"},{state:"CANCEL"}]}).populate('business_id').populate('branch_office_id').populate('id_user').populate('id_delivery').populate('cashier_id').exec()
        if(data)
        {
            console.log('data',data)
            res.json({ msg: "se encontraron correctamente los pedidos",data})
        }else
        {
            res.json({ msg: "no hay pedidos en esta sucursal"})
        }
    }
    else
    {
        res.json({ msg: "el usuario no tiene permisos para realizar esta accion"})
    }

}

module.exports = {GetReports}

