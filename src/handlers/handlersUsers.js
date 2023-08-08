const { users, crearUsers, update, delet } = require("../controllers/controllerUsers")


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



const postUsers = async (req, res) => {
    const { name, surname, email, phone, password } = req.body
    try {
        const crearUsuario = await crearUsers(name, surname, email, phone, password)
        res.status(200).send("Usuario creado Correctamente")
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

const deleteUsers = async (req, res) => {
    const { id } = req.params;
    const deleteUsers = await delet(id);
    try {
        res.status(200).send(`Se elimino el usuario con id: ${id} con exito`)
    } catch (error) {
        res.status(500).send('Ocurrio un error al querer eliminar un usuario')
    }
}

module.exports = { getUsers, postUsers, putUsers, deleteUsers }
