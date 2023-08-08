const { Router } = require("express");
const {getMercadopago,postMercadopago} = require("../handlers/handlersMercadoPago")
const  routesMercadoPago = Router();
routesMercadoPago.post("/create_preference" , postMercadopago)
routesMercadoPago.get("/getmercadopago" , getMercadopago)

module.exports = routesMercadoPago

