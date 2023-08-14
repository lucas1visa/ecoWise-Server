const { Router } = require("express");
const {getUsers,postUsers,putUsers, deleteUsers,deleteLogical,todosLosUsuariosActivos} = require("../handlers/handlersUsers")
const  routesUsers = Router();
routesUsers.get("/" , getUsers)
routesUsers.post("/" , postUsers)
routesUsers.get("/assets" , todosLosUsuariosActivos)
routesUsers.put("/update", putUsers)
routesUsers.delete("/delete/:id", deleteUsers)
routesUsers.put("/deleteLogical/:id",deleteLogical)
module.exports = routesUsers;
