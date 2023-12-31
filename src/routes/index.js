const { Router } = require("express");
const routesUsers = require("./routesUsers");
const routesProducts = require("./routesProducts");
const routesMercadoPago = require("./routesMercadoPago")
const routesCart = require("./routesCart")
const routesLogin = require("./routesLogin")
const routesFavorites = require("./routesFavorite")
const routesPurchase = require("./routesPurchase")
const routesAdmin = require("./routesAdmin");
const routesReview = require("./routesReview")
const router = Router();

router.use("/users", routesUsers)
router.use("/products", routesProducts)
router.use("/", routesMercadoPago)
router.use("/cart",routesCart)
router.use("/login",routesLogin)
router.use("/favorits",routesFavorites)
router.use("/pay",routesPurchase)
router.use("/isAdmin",routesAdmin)
router.use("/review", routesReview)

module.exports = router;
