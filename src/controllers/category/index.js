const { CreateCategory } = require("./CreateCategory");
const { DeleteCategory } = require("./DeleteCategory");
const { GetCategory } = require("./GetCategory");
const { GetCategorys } = require("./GetCategorys");
const { UpdateCategory } = require("./UpdateCategory");

module.exports = {
    UpdateCategory,
    GetCategorys,
    GetCategory,
    DeleteCategory,
    CreateCategory
}