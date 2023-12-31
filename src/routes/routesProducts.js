const { Router } = require("express");
const {getProducts, postProducts, putProducts, deleteProduct,getProductByName,getProductById,getProductByCategory,postProductAdmin} = require("../handlers/handlersProducts")
const  routesProducts = Router();
routesProducts.get("/" ,getProducts)
routesProducts.get("/search/:id" ,getProductById)
routesProducts.post("/", postProducts)
routesProducts.put("/update", putProducts)
routesProducts.delete("/delete/:id", deleteProduct)
routesProducts.get("/sea", getProductByCategory);
routesProducts.post("/admin/create", postProductAdmin)


module.exports = routesProducts;
