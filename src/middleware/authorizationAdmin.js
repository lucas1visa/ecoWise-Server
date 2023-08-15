const jwt = require("jsonwebtoken")
const { KEYWORD_JWT } = process.env;
require('dotenv').config();


const verifyToken = async(req,res,next) =>{
    try {
        // verificamos si en la configuracion enviada desde el front esta el header
        const headerToken = req.header('Authorization');
        // en caso de no estar
        if(!headerToken) {
            return res.status(401).json({msg : 'token not found'})
        }
        console.log(headerToken);
        // en caso de si estar la configuracion, separamos en un array con 2 elementos
        const validateHeader = headerToken.split(' ');
        console.log(validateHeader);
        // controlamos el primero elemento
        if(validateHeader[0] === "Bearer"){
            // el segundo elemento sera el token
            const token = validateHeader[1];
            console.log(`este es el token`,token);
            // desencryptamos el token
            const decoded = jwt.verify(token, KEYWORD_JWT);
            console.log(decoded);
            // controlamos que informacion trae
            if(decoded){
                // la retornamos la info para la otra funcion siguiente
                req.userData = {
                    id: user.dataValues.id,
                    isAdmin: decoded.isadmin 
                };
                next();
            }else{
                // en caso de no encontrar nada en el token
                return res.status(401).json({ msg: "Token not found"});
            }
        }else{
            // en caso de no encontrar el header
            res.status(401).json({msg: "Invalid Header"})
        }
    } catch (error) {
        console.log('Error en verifyToken');
        res.status(404).json({msg: 'Server error'});
    }
}

module.exports = verifyToken;