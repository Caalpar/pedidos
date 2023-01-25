const path = require('path')

const GetImage = async (req,res) =>{
    let name = req.params.name
    res.sendFile(path.join(__dirname, `../../assets/imgs/${name}`))
}

module.exports = {GetImage}