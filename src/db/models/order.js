const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({   
    
    order:[{
        porduct_name: {
            type: String,
            require:true,
            match:[/^.{2,}$/,'el nombre del producto tiene que tener por lo menos 2 caracteres']
        },
        product_price:{
            type: Number,
            require:true,
            match:[/^([1-9]\d*(\.|\,)\d*|0?(\.|\,)\d*[1-9]\d*|[1-9]\d*)$/,'formato del precio incorrecto']
        },
        product_cost:{
            type: Number,
            require:true,
            match:[/^([1-9]\d*(\.|\,)\d*|0?(\.|\,)\d*[1-9]\d*|[1-9]\d*)$/,'formato del costo incorrecto']
        },
        product_description:{
            type: String,
            require:false
        },
    }],

    business_id: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref:'Business'
    },
    
    branch_office_id:{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref:'BranchOffice'
    },
    id_user:{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref:'Users'
    },
    date:{
        type: Number,
        require: true,
        match:[/^\d{1,}$/,'formato de la fecha incorrecto']
    },
    date_update:{
        type: Number,
        match:[/^\d{1,}$/,'formato de la fecha de actualizacion incorrecto']
    },
    oreder_number:{
        type: Number,
        require: true,
        match:[/^\d{1,}$/,'formato del numero de orden incorrecto']
    },
    cashier_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Users'
    },
    id_delivery:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Users'
    },
    description:{
        type: String,
    },
    description_cancel:{
        type: String,
    },
    state: {
        type: [{
            type: String,
            enum: ['RECEIVED','PROCESS', 'COMING' , 'DELIVERED' , 'CANCEL']
        }],
        default: ['RECEIVED'],
        require:true
    },

});


module.exports = mongoose.model('Orders',orderSchema,'oredersCollection');
