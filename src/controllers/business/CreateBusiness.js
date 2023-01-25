const Business = require("../../db/models/business.js")
const {OptimizePhoto} = require("../../tools/OptimizePhoto.js")

const CreateBusiness = (req, res) => {

    const { name } = req.body

    let img = req.file?.filename || 'sin_foto.png'

    const new_Business = new Business({name,img})
        
    new_Business.save(async (err, business) => {
        if (err) {
            res.json({ msg: "error al crear la empreas", create: false,err })

        }

        if (business) {

            
            if(img != 'sin_foto.png')
            {
                let arrIMG = img.split(".")
                let extencion  = arrIMG[arrIMG.length -1]                 
                img =  business._id +'.'+extencion
                business.img = img
                await business.save()
            }

            let data = await Business.findById({_id:business._id}).exec()

            await OptimizePhoto(req.file,business._id,false)

            data.img = img

            res.json({ msg: "la empresa fue creada correctamente", data, create: true })
        }
    })

}

module.exports = { CreateBusiness }