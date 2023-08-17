const { Router } = require("express");
<<<<<<< HEAD
const {getUsers,postUsers,putUsers, deleteUsers} = require("../handlers/handlersUsers")
const  routesUsers = Router();
routesUsers.get("/" , getUsers)
routesUsers.post("/" , postUsers)
=======
const {getUsers,postUsers,putUsers, deleteUsers,deleteLogical,todosLosUsuariosActivos} = require("../handlers/handlersUsers")
const  routesUsers = Router();
routesUsers.get("/" , getUsers)
routesUsers.post("/" , postUsers)
routesUsers.get("/assets" , todosLosUsuariosActivos)
>>>>>>> parent of 22898e5 (Merge branch 'main' of https://github.com/lucas1visa/ecoWise-Server)
routesUsers.put("/update", putUsers)
routesUsers.delete("/delete/:id", deleteUsers)
routesUsers.put("/deletelogical/:id",deleteLogical)
module.exports = routesUsers;
