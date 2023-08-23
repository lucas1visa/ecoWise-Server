const { users, crearUsers, changeUser, update, delet, getAllUsersAssets, deleteLogicalUser,getUserById ,getUserByEmail,usermailtoken} = require("../controllers/controllerUsers")
const { transporter, sendWelcomeEmail,sendMailChangePass } = require("../utils/mailer")

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
const sendMail = async(req,res) =>{
  try {
    let {email} = req.body;
    let sendUsmail = await usermailtoken(email);
    if(sendUsmail){
      res.status(200).send('se envio mail con exito');
      sendMailChangePass(email, sendUsmail);
    }else{
      throw new Error('La solicitud es erronea debido a se registro con otra autenticacion')
    }
  } catch (error) {
    res.status(400).json({error:error.message});
  }
}
const userMail = async (req,res)=>{
  try {
    const {email} = req.body;
    const foundmail = await getUserByEmail(email);
    if(foundmail){
      res.status(200).send(foundmail)
    }else{
      throw new Error('este mail esta disponible')
    }
  } catch (error) {
    res.status(400).json({error:error.message})
  }
}
// funcion que permite crear un usuario desde el formulario de la web
const postUsers = async (req, res) => {
  const { name, surname, email, phone, password, register } = req.body;
  console.log(name,surname,email,phone,password,register);
  try {
    const crearUsuario = await crearUsers(name, surname, email, phone, password, register);
    if(crearUsuario){
      res.status(200).send(crearUsuario)
      sendWelcomeEmail(email, name);
      res.status(200).send("Usuario creado correctamente y correo de bienvenida enviado.");
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
  try {
    const { password, email } = req.body;
    const updateUser = await update(email, password);
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




module.exports = { getUsers, postUsers, putUsers, deleteUsers, deleteLogical, todosLosUsuariosActivos, putUserData,userMail,sendMail }
