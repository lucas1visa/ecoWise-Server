const { Router } = require("express");
const {getUsers,postUsers,putUsers, deleteUsers} = require("../handlers/handlersUsers")
const  routesUsers = Router();
routesUsers.get("/" , getUsers)
routesUsers.post("/" , postUsers)
routesUsers.put("/update", putUsers)
routesUsers.delete("/delete/:id", deleteUsers)
module.exports = routesUsers;
