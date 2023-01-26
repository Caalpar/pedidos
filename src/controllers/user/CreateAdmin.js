const Business = require("../../db/models/business.js")
const BranchOffice = require("../../db/models/branch_office.js")
const User = require("../../db/models/user")

const CreateAdmin = async () => {

    try {
        
        
        let business = await CreateBusinesAdmin()
        
        let bruchOffice = await CreateBranchOfiice(business._id)
        
        await CreateUser(bruchOffice._id)
        
    } catch (error) {
        console.error('error al crear el usuario administrador', error)
    }
}


const CreateBusinesAdmin = async ()=>{

    let existBusiness = await Business.findOne({ name:'Genesis'}).exec()
    
    if(existBusiness)
    {
        console.log('La empresa Genesis ya existe')
        return existBusiness
    }
    
    const new_Business = new Business({name:'Genesis',img:'sin_foto.png'})
    return await new_Business.save()
}

const CreateBranchOfiice = async (business_id)=>{

    let existBranchoffice = await BranchOffice.findOne({ name:'sucursal 1',business_id: business_id }).exec()
    
    if(existBranchoffice)
    {
        console.log('La sucursal 1 ya existe')
        return existBranchoffice
    }

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
       email : 'sucursal1@genesis.com',
       name :'sucursal 1',
       phone: 099123456,
       address : 'address',
       business_id: business_id ,
       hours_days: default_hours_days
    })

    return await new_BranchOffice.save()
}

const CreateUser = async (branch_office_id)=>{

    let existUser = await User.findOne({ roles:"ADMIN",branch_office_id:branch_office_id }).exec()
    
    if(existUser)
    {
        console.log('La ususario ya existe')
        return existUser
    }
    else
    {
        let usersAdmin = await User.findOne({ roles:"ADMIN"}).exec()
        if(usersAdmin)
        {
            User.deleteMany({roles:"ADMIN"}).exec(); 
        }
    }


    const new_user = new User()

    new_user.email            =    'admin@genesis.com'
    new_user.first_name       =    'admin'
    new_user.last_name        =    'genesis'
    new_user.phone            =    '099123456'
    new_user.branch_office_id =    branch_office_id
    new_user.password         =    new_user.generateHash(process.env.ADMIN_PASSWORD)
    new_user.roles            =    ["ADMIN"]
    new_user.address          =    'address'
    new_user.neighborhood     =    ''
    new_user.corner           =    ''
    new_user.tuition          =    ''
    new_user.vehicle          =    ''
        
    return await new_user.save()
}

module.exports = { CreateAdmin }




