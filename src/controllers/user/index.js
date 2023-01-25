const { CreateUser } = require("./CreateUser");
const { DeleteUser } = require("./DeleteUser");
const { GetUser } = require("./GetUser");
const { GetUserLogin } = require("./GetUserLogin");
const { GetUsers } = require("./GetUsers");
const { SendMailAllUser } = require("./SendMailAllUser");
const { UpdateUser } = require("./UpdateUser");





module.exports = {
    UpdateUser,
    GetUsers,
    GetUser,
    DeleteUser,
    CreateUser,
    GetUserLogin,
    SendMailAllUser
}
