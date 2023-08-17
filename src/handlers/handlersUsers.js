const { users, crearUsers, update, delet, getAllUsersAssets, deleteLogicalUser } = require("../controllers/controllerUsers")
const transporter = require("../utils/mailer")

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
    if(email){
      if(register){
        // mensaje para registro con google
      } else {
    const emailInfo = await transporter.sendMail({
      from: '"ecoWise" <eco.wise.commerce@gmail.com>',
      to: email,
      subject: "Welcome to Our App",
      html: `
      <p>Hola ${name},</p>
      <p>¡Bienvenido a ecoWise Commerce! Estamos emocionados de tenerte en nuestra comunidad.</p>
      <p>Con ecoWise Commerce, tendrás acceso a una variedad de productos sostenibles.</p>
      <p>Creemos en generar un impacto positivo en el medio ambiente, y tu apoyo es crucial en nuestro camino.</p>
      <p>Siéntete libre de explorar nuestra aplicación y descubrir soluciones amigables con el medio ambiente.</p>
      <p>Si tienes alguna pregunta o necesitas ayuda, no dudes en contactar a nuestro equipo de soporte.</p>
      <p>Gracias por elegir ecoWise Commerce. ¡Juntos podemos crear un futuro más verde!</p>
      <p>Saludos cordiales,</p>
      <p>El Equipo de ecoWise</p>
    `
    })}};
    if(crearUsuario){
      res.status(200).send("Usuario creado Correctamente");
    } else {
      throw new Error('Error al registrarse');
    }
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
};


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

module.exports = { getUsers, postUsers, putUsers, deleteUsers, deleteLogical, todosLosUsuariosActivos }
