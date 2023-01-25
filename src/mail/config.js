const nodemailer = require('nodemailer')
const {GetTimestamp} = require('../tools/GetTimestamp.js')
const {SaveLog} = require('../fs/SaveLog.js')


const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    pool: true,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
})

transport.verify(function(error, success) {
    if (error) {
        
        let msg = `${GetTimestamp()} - mail server connection failed:  ${error}`
        SaveLog(msg)
    } else {
        let msg = `${GetTimestamp()} - connected to mail server:  ${success}`
        SaveLog(msg)
    }
});

module.exports = transport