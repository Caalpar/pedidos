const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    price:{
        type: Number,
        require:true,
        match:[/^([1-9]\d*(\.|\,)\d*|0?(\.|\,)\d*[1-9]\d*|[1-9]\d*)$/,'formato de precio incorrecto']
    },
    cost:{
        type: Number,
        match:[/^([1-9]\d*(\.|\,)\d*|0?(\.|\,)\d*[1-9]\d*|[1-9]\d*)$/,'formato de costo incorrecto']
    },
    description: String,
    title: {
        type: String,
        require:true,
        match:[/^.{2,}$/,'el titulo tiene que tener por lo menos 2 caracters']
    },
    img: String,
    availbility: Boolean,
    front_page: Boolean,
    branch_office_id:{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref:'BranchOffice'
    },
    category_id:{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref:'Category'
    },
});

module.exports = mongoose.model('Product', productSchema, 'productCollection');