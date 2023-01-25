const Business = require("../../db/models/business.js")
const {DeleteImg,OptimizePhoto} = require('../../tools/OptimizePhoto.js')

const UpdateBusiness = (req,res) =>{

    const { _id,name} = req.body


    Business.findById({_id:_id},(err,business)=>{
        if (err) {
            res.json({ msg: "error al actualizar la empresa ", create: false,err })
        }

        if(business)
        {
            let img_delete = business.img

            business.name = name

            console.log('req.file',req.file)

            if(req.file && req.file.filename){
                OptimizePhoto(req.file,business._id,false)
                let arrIMG = req.file.filename.split(".")
                let extencion  = arrIMG[arrIMG.length -1]                 
                business.img = business._id +'.'+extencion
               
            }

            business.save((err, data) => {

                if (err) {
                    res.json({ msg: "error al actualizar la empresa ", create: false,err })
        
                }
        
                if (data) {
                    if(req.file && req.file.filename)
                        DeleteImg('../assets/imgs/',img_delete,'sin_foto.png')
                    res.json({ msg: "la empresa fue actualizada correctamente", data, create: true })
                }
            })

        }


    })


}

module.exports = {UpdateBusiness}