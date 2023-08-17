const { Router } = require("express");
const routesUsers = require("./routesUsers");
const routesProducts = require("./routesProducts");
const routesMercadoPago = require("./routesMercadoPago")
const routesCart = require("./routesCart")
const routesLogin = require("./routesLogin")
const routesFavorites = require("./routesFavorite")
const router = Router();
router.use("/users", routesUsers)
router.use("/products", routesProducts)
router.use("/", routesMercadoPago)
router.use("/cart",routesCart)
router.use("/login",routesLogin)
router.use("/favorits",routesFavorites)

module.exports = router;
