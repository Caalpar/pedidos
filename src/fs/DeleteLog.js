var fs = require('fs');
const path = require('path');

const DeleteLog = () =>{
    let date = new Date()

    date.setDate(date.getDate()- process.env.DAYS_LOG_DELETE || 90)

    let day = date.getDate()
    let month = date.getMonth() + 1 
    let year = date.getFullYear()

    let day_string = day>10?day.toString():'0'+day.toString()
    let month_string = month>10?month.toString():'0'+month.toString()
    let year_string = year.toString()

    let dateString = year_string + month_string + day_string

    
    let route = path.join(__dirname,'../../logs/',dateString+'.log')
    if (fs.existsSync(route)) {
          fs.unlinkSync(route);
      }
    

}
   
module.exports = {DeleteLog}