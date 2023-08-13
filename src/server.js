const express = require("express");
const router = require("./routes");
const morgan = require("morgan");
const cors = require("cors");
const server = express();

server.use(morgan("dev"));//morgan para el registrode solicitudes en la consola
server.use(express.json());//Analiza el cuerpo de las solicitudes HTTP
server.use(cors({
    origin: ['https://ecowise-web-site.vercel.app',"http://localhost:5173", "http://localhost:3001"],
  }));//Habilita CORS para permitir que otros dominios puedan acceder a los recursos del servidor
server.use(router);//Usamos el enrutador "router" para definir y manejar las rutas de la aplicación

module.exports = server;
