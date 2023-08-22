const {Router} = require("express");
const routesReview = Router();
const {addReview,getReview,deletReview} = require("../handlers/handlerReview");


routesReview.post("/",addReview)
routesReview.get("/",getReview)
routesReview.delete("/",deletReview)
module.exports = routesReview;