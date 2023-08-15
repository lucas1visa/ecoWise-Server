const { Router } = require("express");
const {postPurcharse} = require("../handlers/handlersPurcharse.js")
const  routesPurchase = Router();
routesPurchase.post("/" , postPurcharse)

module.exports = routesPurchase;