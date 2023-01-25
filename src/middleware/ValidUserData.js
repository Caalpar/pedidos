
const ValidUserData = (req, res , next) => {

    const { email,password,first_name,last_name,phone } = req.body

    const regexEmail = /.+\@.+\..+/

    if(!email || !regexEmail.test(email)){
        res.json({ msg: "mail invalido",create:false})
        return
    }

    const regexName = /^\w+.{1,}$/

    if(!first_name || !regexName.test(first_name)){
        res.json({ msg: "el nombre tiene que tener un minimo de 2 caracteres",create:false})
        return
    }
    if(!last_name || !regexName.test(last_name)){
        res.json({ msg: "el apellido tiene que tener un minimo de 2 caracteres",create:false})
        return
    }

    const regexPhone = /^\d{9,}$/

    if(!phone || !regexPhone.test(phone)){
        res.json({ msg: "el telefono tiene un formato incorrecto",create:false})
        return
    }
    const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/

    if(!password || !regexPassword.test(password)){
        res.json({ msg: "la contraseña tiene que ser alfa numerica, tener un minimo de 8 caracteres y contener una mayuscula",create:false})
        return
    }

    next()
 

}

module.exports = { ValidUserData }