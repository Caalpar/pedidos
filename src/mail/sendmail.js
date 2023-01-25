const transport = require('./config.js')
const {SaveLog} = require('../fs/SaveLog.js')
const {GetTimestamp} = require('../tools/GetTimestamp.js')


const SendMail = (to,subject,text='',html='',cc ='') =>{

    let mailOptions = {
        from:process.env.MAIL_SENDER,
        to,
        cc,
        subject,
        text,
        html
    }

    transport.sendMail(mailOptions, (err, info) => {
        if (err) {
            let msg = `${GetTimestamp()}[Error] - could not send mail to ${to}`
            console.log(msg)
            SaveLog(msg)
        } else {
            let msg = `${GetTimestamp()}[email] - send to ${to}`
            console.log(msg)
            SaveLog(msg)
        }
    })

}

module.exports = {SendMail}