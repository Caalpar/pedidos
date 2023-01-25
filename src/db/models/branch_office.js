const mongoose = require('mongoose');


const branchOfficeSchema = new mongoose.Schema({
    business_id: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    email: {
        type: String,
        trim: true,
        require: true,
        default: '',
        match: [/.+\@.+\..+/, 'el mail no es valido']
    },
    name: {
        type: String,
        trim: true,
        default: '',
        match:[/^.{2,}$/,'el nombre tiene que tener un minimo de 2 caracteres']
    },
    address: {
        type: String,
        trim: true,
        default: '',
        match:[/^.{2,}$/,'la direccion tiene que tener un minimo de 2 caracteres']
    },
    phone: {
        type: Number,
        trim: true,
        default: '',
        match:[/^\d{9,}$/,'el telefono tiene un formato incorrecto']
    },
    hours_days: {
        time_zone:Number,
        days_noon: {
            monday: Boolean,
            tuesday: Boolean,
            wedesday: Boolean,
            thursday: Boolean,
            friday: Boolean,
            saturday: Boolean,
            sunday: Boolean
        },
        days_morning: {
            monday: Boolean,
            tuesday: Boolean,
            wedesday: Boolean,
            thursday: Boolean,
            friday: Boolean,
            saturday: Boolean,
            sunday: Boolean
        },
        days_late: {
            monday: Boolean,
            tuesday: Boolean,
            wedesday: Boolean,
            thursday: Boolean,
            friday: Boolean,
            saturday: Boolean,
            sunday: Boolean
        },
        days_nigth: {
            monday: Boolean,
            tuesday: Boolean,
            wedesday: Boolean,
            thursday: Boolean,
            friday: Boolean,
            saturday: Boolean,
            sunday: Boolean
        },
        hours: {

            noon: {
                open: {
                    type: String,

                    default: '00:00'
                },
                close: {
                    type: String,

                    default: '06:00'
                }
            },
            morning: {
                open: {
                    type: String,

                    default: '06:00'
                },
                close: {
                    type: String,

                    default: '12:00'
                }
            },
            late: {
                open: {
                    type: String,

                    default: '12:00'
                },
                close: {
                    type: String,

                    default: '18:00'
                }
            },
            nigth: {

                open: {
                    type: String,

                    default: '18:00'
                },
                close: {
                    type: String,

                    default: '23:59'
                }

            }
        }
    }

});

module.exports = mongoose.model('BranchOffice', branchOfficeSchema, 'branchOfficeCollection');