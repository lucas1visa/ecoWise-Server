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
        const foundUser = await User.findOne({
            where: {
              email: email,
            }
        });
        console.log(foundUser);
        if (!foundUser) {
            throw new Error('Email not found');
        }

        if (foundUser.isDeleted) {
            throw new Error('Usuario Bloqueado');
        }

        // En caso de encontrar un usuario comparamos la contraseña enviada desde el front
        // con la contraseña (encriptada) de la DB
        const passwordCheck = await bcrypt.compare(password, foundUser.password);
        console.log(passwordCheck)
        if (!passwordCheck) {
            throw new Error('Error Password');
        }

        // Decidimos qué información enviar dentro del token, en este caso pasamos el id y si es admin
        const payloadForToken = {
            id: foundUser.id,
            admin: foundUser.isAdmin
        };

        // Aquí es donde generamos el token
        const token = jwt.sign(payloadForToken, KEYWORD_JWT);

        return token;
    } catch (error) {
        throw error; // Lanzamos la excepción para manejarla en el lugar donde se llama a esta función
    }
}


module.exports = createToken;