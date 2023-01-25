const path = require('path')
const fs = require('fs')

const sharp = require('sharp')

const OptimizePhoto = async(file,name = '',optimize = true) => {
    if(file){
    let img_path = path.join(__dirname, "../assets/imgs/")

    console.log(img_path)
    console.log(file)

    let arrFile = file.originalname.split('.')
    let extecion = arrFile[ arrFile.length - 1 ]

        let img_path_source = path.join(__dirname, "../assets/imgsOriginales/")
        let quality = 100
    

            if (file.size <= 100000) quality = 100
            else if (file.size <= 200000) quality = 90
            else if (file.size <= 300000) quality = 80
            else if (file.size <= 400000) quality = 70
            else if (file.size <= 500000) quality = 60
            else if (file.size <= 600000) quality = 50
            else if (file.size <= 700000) quality = 40
            else if (file.size <= 800000) quality = 30
            else if (file.size <= 900000) quality = 20
            else quality = 20
        

        if(optimize){

            if(name === '')
            {
                await sharp(path.join(img_path_source, file.originalname)).jpeg({
                    quality
                }).toFile(img_path + file.originalname)
            }else{
                await sharp(path.join(img_path_source, file.originalname)).jpeg({
                    quality
                }).toFile(img_path + name +'.'+ extecion)
            }
        }
        else
        {
            if(name === '')
            {
                await sharp(path.join(img_path_source, file.originalname)).toFile(img_path + file.originalname)
            }else{
                await sharp(path.join(img_path_source, file.originalname)).toFile(img_path + name +'.'+ extecion)
            }

        }

    
        setTimeout(() => {
            DeleteImg('../assets/imgsOriginales/', file.originalname)
        }, 2000);
    }
}

const DeleteImg = (url, name_img,img_exclud = '') => {

    if (img_exclud == name_img)
        return

    let img_path = path.join(__dirname, url)
    img_path += name_img
    try {
        fs.unlinkSync(img_path)
    } catch (err) {
        console.error(err)
    }
}

module.exports = {OptimizePhoto,DeleteImg}