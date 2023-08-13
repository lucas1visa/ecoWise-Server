const { Router } = require("express");
const { putCart,postCart,getCart, deleteProdCart} = require("../handlers/handlersCart")
const routesCart = Router();


routesCart.get("/",getCart)
routesCart.post("/",postCart)
routesCart.put("/",putCart)
routesCart.delete("/delete/:id", deleteProdCart)



module.exports = routesCart