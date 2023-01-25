const GetTimestamp = () =>{
    let date = new Date()

    let day = date.getDate()
    let month = date.getMonth() + 1 
    let year = date.getFullYear()

    let day_string = day>9?day.toString():'0'+day.toString()
    let month_string = month>9?month.toString():'0'+month.toString()
    let year_string = year.toString()

    let hours = date.getHours()
    let minutes = date.getMinutes() + 1 
    let seconds = date.getSeconds()

    let hours_string = hours>9?hours.toString():'0'+hours.toString()
    let minutes_string = minutes>9?minutes.toString():'0'+minutes.toString()
    let seconds_string = seconds>9?seconds.toString():'0'+seconds.toString()

    let dateString = year_string + month_string + day_string
    let timeString = hours_string +':'+ minutes_string +':'+ seconds_string

    return `[${dateString} - ${timeString}]`
}

module.exports = {GetTimestamp}