
const ValidOrderData = (req, res , next) => {

    const {         
        order,
        branch_office_id,
        id_user,
        business_id 
    } = req.body


    const regexId = /[0-9][a-z]/

    if(!business_id || !regexId.test(business_id) || business_id.toString().length != 24){
        res.json({ msg: "Inice sesion o registrese para hacer el pedido",create:false})
        return
    }
    if(!branch_office_id || !regexId.test(branch_office_id) || business_id.toString().length != 24){
        res.json({ msg: "Inice sesion o registrese para hacer el pedido",create:false})
        return
    }

    if(!id_user || !regexId.test(id_user) || business_id.toString().length != 24){
        res.json({ msg: "Inice sesion o registrese para hacer el pedido",create:false})
        return
    }

    if(!order || order.length == 0){
        res.json({ msg: "agregue un producto para hacer el pedido",create:false})
        return
    }

    const regexPrice = /^([1-9]\d*(\.|\,)\d*|0?(\.|\,)\d*[1-9]\d*|[1-9]\d*)$/
    const regexName = /^.{2,}$/

    let notApprove = false
    for (let index = 0; index < order.length; index++) {
        const ord = order[index];
        if(!regexPrice.test(ord.product_price))
        {
            notApprove = true
            break;
        }
        if(!regexPrice.test(ord.product_cost))
        {
            notApprove = true
            break;
        }
        if(!regexName.test(ord.porduct_name))
        {
            notApprove = true
            break;
        }

    }

    if(notApprove){
        res.json({ msg: "error al cargar el producto",create:false})
        return
    }

    next()
 
}

module.exports = { ValidOrderData }