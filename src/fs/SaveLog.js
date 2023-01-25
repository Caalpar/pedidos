const fs = require('fs');
const path = require('path')

const SaveLog = (data) => {

    let log = `${data}\n`

    console.log(log)

    let logPath = path.join(__dirname, '../../logs')

    fs.access(logPath, (error) => {
        if (error) {
            fs.mkdir(logPath, (err) => {
                if (err)
                    console.log('[Error] - error creating directory log')
                else {

                    let route = path.join(__dirname, '../../logs/', 'pedido.log')


                    try {
                        fs.writeFileSync(route, log, { flag: 'a' });
                        // file written successfully
                    } catch (err) {
                        console.error(err);
                    }
                }
            })
        }
        else {
            let route = path.join(__dirname, '../../logs/', 'pedido.log')


            try {
                fs.writeFileSync(route, log, { flag: 'a' });
                // file written successfully
            } catch (err) {
                console.error(err);
            }
        }
    })

}

module.exports = { SaveLog }