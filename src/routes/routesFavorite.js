const {Router} = require("express");
const routesFavorites = Router();
const {addFavorites,getFavorites,deletFavorites} = require("../handlers/handlerFavorites");


routesFavorites.post("/",addFavorites)
routesFavorites.get("/",getFavorites)
routesFavorites.delete("/",deletFavorites)
module.exports = routesFavorites;