const { User } = require("../db")
// instalamos las dependencias para desencriptar la password desde la DB (npm install bcrypt)
const bcrypt = require("bcrypt");
// instalamos las dependencias para generar tokens (npm install jsonwebtoken)
const jwt = require("jsonwebtoken");
// traemos la variable de entorno
const { KEYWORD_JWT } = process.env;

const createToken = async (email, password) => {
    try {
        // Buscamos el Usuario por email en nuestra DB
        const foundUser = await User.findOne({ where: { email: email } });
        if (foundUser === null) {
            throw new Error('Email not found');
        }
        // En caso de encontrar un usuario comparamos la contraseña enviada desde front
        // con la contraseña(encryptada) de la DB
        const PasswordCheck = await bcrypt.compare(password, foundUser.password);
        if(!PasswordCheck){
            throw new Error('Error Password')
        }
        //decidimos que informacion mandar dentro del token, en este caso pasamos el id y indicamos si es admin
        const payloadForToken = {
            id: foundUser.id,
            admin: foundUser.isAdmin
        };
        // aqui utilizamos es donde generamos el token para ello pasamos la payload (informacion a encryptar)
        // y una variable de entorno la cual no sirve para darle un sign (es decir un codigo de cifrado, puede ser cualquier string)
        const token = jwt.sign(payloadForToken, KEYWORD_JWT);
        return token;
    } catch (error) {
        return error;
    }
}

module.exports = createToken;