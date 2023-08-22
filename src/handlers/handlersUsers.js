const { users, crearUsers, changeUser, update, delet, getAllUsersAssets, deleteLogicalUser,getUserById } = require("../controllers/controllerUsers")
const { transporter, sendWelcomeEmail } = require("../utils/mailer")

const getUsers = async (req, res) => {
  try {
    const { userId } = req.params;
    let result;
    if (userId) {
      result = await getUserById(userId);
    } else {
      result = await users();
    }
    if (!result) {
      res.status(404).send("Usuario no encontrado");
    } else {
      res.status(200).send(result);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};


// funcion que permite crear un usuario desde el formulario de la web
const postUsers = async (req, res) => {
  const { name, surname, email, phone, password, register } = req.body;
  try {
    const crearUsuario = await crearUsers(name, surname, email, phone, password, register);

    // Send an email after creating a user
    if (email) {

      if (register) {
        // Mensaje para registro con Google
        sendWelcomeEmail(email, name);
      } else {
        // Llama a la función de envío de correo de bienvenida
        sendWelcomeEmail(email, name);

        res.status(200).send("Usuario creado correctamente y correo de bienvenida enviado.");
      }
    } else {
      // No se proporcionó correo electrónico
      res.status(400).send("Correo electrónico requerido para enviar el mensaje de bienvenida.");
    }
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
};

const putUserData = async (req, res) => {
  const { phone, password, address1, address2, number, door, city, province, country, postalCode } = req.body
  try {
    const cambiaUsuario = await changeUser(phone, password, address1, address2, number, door, city, province, country, postalCode)
    res.status(200).send("Usuario modificado Correctamente")
  } catch (error) {
    res.status(500).send("Error: " + error.message)
  }
}

const putUsers = async (req, res) => {
  const { password, id } = req.body;
  const updateUser = await update(id, password)
  try {
    res.status(200).send("Usuario actualizado correctamente");
  } catch (error) {
    res.status(500).send("Hubo un error al actualizar el usuario");
  }
};
const deleteLogical = async (req, res) => {
  const { id } = req.params
  try {
    const delUser = await deleteLogicalUser(id)

    res.status(200).send("Usuario bloqueado correctamente");
  } catch (error) {

  }
}

const deleteUsers = async (req, res) => {
  const { id } = req.params;
  const deleteUsers = await delet(id);
  try {
    res.status(200).send(`Se elimino el usuario con id: ${id} con exito`)
  } catch (error) {
    res.status(500).send('Ocurrio un error al querer eliminar un usuario')
  }
}
const todosLosUsuariosActivos = async (req, res) => {
  const getUsers = await getAllUsersAssets();
  try {
    res.status(200).send(getUsers)
  } catch (error) {
    res.status(500).send('Ocurrio un error al querer traer todos los usuario')
  }
}




module.exports = { getUsers, postUsers, putUsers, deleteUsers, deleteLogical, todosLosUsuariosActivos, putUserData }
