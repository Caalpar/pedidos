const { CreateProduct } = require("./CreateProduct.js");
const { DeleteProduct } = require("./DeleteProduct.js");
const { GetImage } = require("./GetImage.js");
const { GetProduct } = require("./GetProduct.js");
const { GetProducts } = require("./GetProducts.js");
const { UpdatePrduct } = require("./UpdatePrduct.js");


module.exports = {
    CreateProduct,
    DeleteProduct,
    GetProduct,
    GetProducts,
    UpdatePrduct,
    GetImage
}