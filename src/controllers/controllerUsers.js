const { User,Cart,Product } = require("../db");
const bcrypt = require("bcrypt")

const users = async () => {
  try {
    const todosLosUsuarios = await User.findAll({
      include:{
        model: Cart,
        include:Product
      }
    });
    return todosLosUsuarios;
  } catch (error) {
    console.error("Error al obtener los Usuarios:", error);
    return null;
  }
};

const getUserById = async (userId) => {
  try {
    const user = await User.findByPk(userId, {
      include: {
        model: Cart,
        include: Product,
      },
    });
    return user;
  } catch (error) {
    console.error("Error al obtener el Usuario por ID:", error);
    return null;
  }
};


const crearUsers = async (name, surname, email, phone, password) => {
  try {
    // una vez recibida la password al crear el usuario la encryptamos para almacenarla en la DB
    let hashPassword = bcrypt.hashSync(password, 10)
    // Realizamos la validacion de que 2 usuarios no tengan el mismo email
    const emailFound = await User.findOne({ where: { email } });
    if (emailFound) {
      throw new Error('Email already exist');
    }
    const nuevoUsuario = await User.create({
      name,
      surname,
      email,
      phone,
      password: hashPassword,
    });
    return nuevoUsuario;
  } catch (error) {
    console.error("Error al Registrarse:", error);
    return null;
  }
};
const update = async (id, password) => {
  try {
    let hashPassword = bcrypt.hashSync(password, 10)
    const passwordUpdate = await User.update(
      { password: hashPassword },
      {
        where: {
          id: id,
        },
      }
    )
  } catch (error) {
    throw error;
  }
};

const delet = async (id) => {

  try {
    const getUsers = await User.findByPk(id);

    if (getUsers) {
      getUsers.destroy();
      return "Deleted Users";
    } else {
      throw Error("Users not found")
    }
  } catch (error) {
    throw error;
  }
}

module.exports = { users, crearUsers, update, delet, getUserById };
