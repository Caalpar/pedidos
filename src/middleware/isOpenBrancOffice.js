const BranchOffice = require("../db/models/branch_office.js")


const isOpenBrancOffice = (req, res , next) => {

    const { branch_office_id } = req.body
    BranchOffice.findById({_id:branch_office_id}, (err, data) => {

        if(err)
        {
            res.json({ msg: "error al buscar la sucursal",err,sucess:false})
        }

        if(data)
        {

            let nowDate = new Date()

            let time_zone = data.hours_days.time_zone - parseInt(nowDate.getTimezoneOffset()/60)

            let curretTime = Date.now() - (time_zone * 60 * 60 * 1000)

            let currentDate = new Date(curretTime)

            let hour = currentDate.getHours()
            let minutes = currentDate.getMinutes()
            let day = currentDate.getDay()

            console.log('open hours', CheckIsOpen(day,hour,minutes,data.hours_days))
            if(CheckIsOpen(day,hour,minutes,data.hours_days))
                next()
            else
                res.json({ msg: "la sucursal esta cerrada",sucess:false})
        }
    })
}

const CheckIsOpen = (day,hour,minutes,hours_days) =>{

    return  CheckHoursAndDay(day,hour,minutes,hours_days.days_noon,hours_days.hours.noon.open,hours_days.hours.noon.close) ||
            CheckHoursAndDay(day,hour,minutes,hours_days.days_morning,hours_days.hours.morning.open,hours_days.hours.morning.close) ||
            CheckHoursAndDay(day,hour,minutes,hours_days.days_late,hours_days.hours.late.open,hours_days.hours.late.close) ||
            CheckHoursAndDay(day,hour,minutes,hours_days.days_nigth,hours_days.hours.nigth.open,hours_days.hours.nigth.close) 
}

const CheckHoursAndDay = (current_day,currentHours,currentMinutes,openDays,openHours,closeHours) => {
    return CheckIsOpenDay(current_day,openDays) && CheckIsOpenHoursAndMinutes(currentHours,currentMinutes,openHours,closeHours)
}


const CheckIsOpenHoursAndMinutes = (currentHours,currentMinutes,openHours,closeHours) =>
{
    let _openHours = parseInt(openHours.replace(':',''))

    let _closeHours = parseInt(closeHours.replace(':',''))

    let _currentHours = parseInt(currentHours.toString() + currentMinutes.toString())
    
    if(_currentHours >= _openHours && _currentHours < _closeHours)
        return true
    else
        return false

}

const CheckIsOpenDay = (current_day,days) =>{
 
    if(current_day == 0 && days.sunday)
        return true
    if(current_day == 1 && days.monday)
        return true
    if(current_day == 2 && days.tuesday)
        return true
    if(current_day == 3 && days.wedesday)
        return true
    if(current_day == 4 && days.thursday)
        return true
    if(current_day == 5 && days.friday)
        return true
    if(current_day == 6 && days.saturday)
        return true

    return false
}




module.exports = { isOpenBrancOffice }