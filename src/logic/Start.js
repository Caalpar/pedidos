require('dotenv').config();
const Server = require("../class/server.js");
const OnLineOrders = require('../class/OnLineOreders.js')
const {CreateAdmin} = require('../controllers/user/CreateAdmin.js')
// const {Update} = require('./Update.js')

//Crear usuario administrador
CreateAdmin()

//instancia sigleton no borrar
onLineOrders = new OnLineOrders()

const app = new Server()

app.listen()

// setInterval(() => {
//     Update()
// }, 1000);