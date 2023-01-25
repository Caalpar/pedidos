const User = require("../../db/models/user")
const {SendMail} = require("../../mail/sendmail.js")

const SendMailAllUser = async (req,res) =>{

    const {branch_office_id,subject,text,htmlText} = req.body

    let data = await User.find({roles:"CUSTOMER",branch_office_id}).exec()
    
    if(data)
    {
        for (let index = 0; index < data.length; index++) {
            const user = data[index];
            await SendMail(user.email,subject,text,htmlText)
            
        }

        res.json({ msg: "se enviaron los email a todos los usuarios"})
    }else
    {
        res.json({ msg: "el no se encntraron los usuarios"})
    }


}

module.exports = {SendMailAllUser}