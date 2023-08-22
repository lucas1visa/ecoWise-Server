const { Router } = require("express");
const {getUserByEmail} = require("../controllers/controllerUsers")
const {getUsers,postUsers,putUsers, deleteUsers,deleteLogical,todosLosUsuariosActivos, putUserData,userMail} = require("../handlers/handlersUsers")
const  routesUsers = Router();
routesUsers.get("/" , getUsers)
routesUsers.post("/email", userMail);
routesUsers.post("/" , postUsers)
routesUsers.get("/assets" , todosLosUsuariosActivos)
routesUsers.put("/update", putUsers)
routesUsers.put("/update", putUserData)
routesUsers.delete("/delete/:id", deleteUsers)
routesUsers.put("/deletelogical/:id",deleteLogical)
module.exports = routesUsers;
