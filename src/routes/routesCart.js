const { Router } = require("express");
const { putCart,postCart,getCart} = require("../handlers/handlersCart")
const routesCart = Router();


routesCart.get("/",getCart)
routesCart.post("/",postCart)
routesCart.put("/",putCart)


module.exports = routesCart