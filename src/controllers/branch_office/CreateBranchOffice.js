const BranchOffice = require("../../db/models/branch_office.js")


const CreateBranchOffice = (req,res) =>{

    const { email,name,address,phone,hours_days,business_id} = req.body

    let default_hours_days = {
        time_zone: parseInt((new Date().getTimezoneOffset()/60).toString()),
        days_noon: {
            monday: true,
            tuesday: true,
            wedesday: true,
            thursday: true,
            friday: true,
            saturday: true,
            sunday: true
        },
        days_morning: {
            monday: true,
            tuesday: true,
            wedesday: true,
            thursday: true,
            friday: true,
            saturday: true,
            sunday: true
        },
        days_late: {
            monday: true,
            tuesday: true,
            wedesday: true,
            thursday: true,
            friday: true,
            saturday: true,
            sunday: true
        },
        days_nigth: {
            monday: true,
            tuesday: true,
            wedesday: true,
            thursday: true,
            friday: true,
            saturday: true,
            sunday: true
        },
        hours: {
    
            noon: {
                open:  '00:00',
                close: '06:00'           
            },
            morning: {
                open: '06:00',
                close:  '12:00' 
            },
            late: {
                open:'12:00',
                close:'18:00'
            },
            nigth: {
                open:'18:00',
                close:'23:59'
            },

        }
    }

    const new_BranchOffice = new BranchOffice({
       email,
       name,
       phone,
       address,
       business_id,
       hours_days: hours_days || default_hours_days
    })
     
    new_BranchOffice.save((err, data) => {
        if (err) {
            res.json({ msg: "error al crear la sucursal ", create: false,err })

        }

        if (data) {
            res.json({ msg: "la sucursal fue creada correctamente",  data, create: true })
        }
    })

}

module.exports = {CreateBranchOffice}

