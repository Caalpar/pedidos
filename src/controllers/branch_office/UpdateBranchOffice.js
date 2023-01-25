const BranchOffice = require("../../db/models/branch_office.js")

const UpdateBranchOffice = (req,res) =>{
    
    const { _id,email,name,address,phone,hours_days} = req.body

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
                close:'23:59'
            },
            nigth: {
                open:'18:00',
                close:'23:59'
            },
        }
    }

    BranchOffice.findById({_id:_id},(err,branch_office)=>{
        if (err) {
            res.json({ msg: "error al actualizar la sucursal ", create: false,err })
        }

        if(branch_office)
        {
            branch_office.email = email
            branch_office.name = name
            branch_office.phone = phone
            branch_office.address = address
            branch_office.hours_days = hours_days || default_hours_days
            branch_office.save((err, data) => {

                if (err) {
                    res.json({ msg: "error al actualizar la sucursal ", create: false,err })
        
                }
        
                if (data) {
                    res.json({ msg: "la sucursal fue actualizada correctamente", data, create: true })
                }
            })

        }


    })


}

module.exports = {UpdateBranchOffice}