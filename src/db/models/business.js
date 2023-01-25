const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
    name:{
        type: String,
        require:true,
        match:[/^.{2,}$/,'el nombre de la empresa tiene que tener por lo menos 2 carateres']
    },
    img: String,
});

module.exports = mongoose.model('Business', businessSchema, 'businessCollection');