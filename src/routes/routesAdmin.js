const {Router} = require("express");
const routesAdmin = Router();
const handlerAdmin = require("../handlers/handlerAdmin")

// middlewares
// const verifyToken = require("../middleware/authorizationAdmin")
// const cors = require("cors")

// routesAdmin.get("/",[cors(), verifyToken],handlerAdmin)
routesAdmin.post('/',handlerAdmin);
module.exports = routesAdmin;