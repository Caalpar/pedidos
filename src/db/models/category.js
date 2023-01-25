const mongoose = require('mongoose');


const categorySchema = new mongoose.Schema({
    name:{
        type: String,
        require:true,
        match:[/^.{2,}$/, 'el nombre de la categoria tiene que tener por lo menos 2 caracteres']
    },
    branch_office_id:{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
    },

});

module.exports = mongoose.model('Category', categorySchema, 'categoryCollection');