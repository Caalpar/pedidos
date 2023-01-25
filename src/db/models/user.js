const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');


const userSchema = new mongoose.Schema({   
    
    email: {
        type: String,
        trim: true,
        require: true,
        default: '',
        match: [/.+\@.+\..+/, 'el mail no es valido']
    },
    first_name: {
        type: String,
        trim: true,
        require: true,
        default: '',
        match:[/^.{2,}$/,'el nombre tiene que tener un minimo de 2 caracteres']
    },
    last_name:{
        type: String,
        trim: true,
        require: true,
        default: '',
        match:[/^.{2,}$/,'el apellido tiene que tener un minimo de 2 caracteres']
    },
    phone:{
        type: Number,
        default: 0,
        match:[/^\d{9,}$/,'el telefono tiene un formato incorrecto']
    },
    branch_office_id:{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
    },
    password: {
        type: String,
        default: '',
        trim: true,
        require: true,
        match:[/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,'la contraseña tiene que ser alfa numerica, tener un minimo de 8 caracteres y contener una mayuscula']
    },
    roles: {
        type: [{
            type: String,
            enum: ['ADMIN','BUSINESS_ADMIN','BRANCH_OFFICE_ADMIN','CASHIER', 'DELIVERY','CUSTOMER']
        }],
        default: ['CUSTOMER'],
        require: true,
    },
    address:String,
    neighborhood:String,
    reference:String,
    corner:String,
    tuition: String,
    vehicle: String,

});


userSchema.methods.generateHash = (password)=>{
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8),null);
};

userSchema.methods.validatePassword = function(pass){
    return bcrypt.compareSync(pass,this.password);
}




module.exports = mongoose.model('Users',userSchema,'usersCollection');
