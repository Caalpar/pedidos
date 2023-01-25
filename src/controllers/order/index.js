const { CreateOrder } = require("./CreateOrder");
const { DeleteOrder } = require("./DeleteOrder");
const { GetOrder } = require("./GetOrder");
const { GetOrderByUser } = require("./GetOrderByUser");
const { GetOrders } = require("./GetOrders");
const { GetReports } = require("./GetReports");
const { UpdateOrder } = require("./UpdateOrder");


module.exports = {
    UpdateOrder,
    GetOrder,
    GetOrders,
    DeleteOrder,
    GetReports,
    CreateOrder,
    GetOrderByUser
}