const {Router} = require("express")
const checkLogin = require("../handlers/handlersLogin")
const routesLogin = Router();

routesLogin.post("/", checkLogin);



module.exports = routesLogin;