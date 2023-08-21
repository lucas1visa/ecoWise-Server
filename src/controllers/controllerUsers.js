const { User,Cart,Product,Favorite,Purchase} = require("../db");
const bcrypt = require("bcrypt")

const users = async () => {
  try {
    const todosLosUsuarios = await User.findAll({
      include: [
        {
          model: Cart,
          include: [Product],
        },
        {
          model: Favorite,
          include: [Product],
        },
        {
          model: Purchase,
          include: [
            {
              model: Product,
              attributes: ["id", "name", "price"], // Include only the desired attributes
            },
          ],
          attributes: ["id", "quantity", "payment_id", "payment_type", "status", "UserId"], // Include Purchase attributes
        },
      ],
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


const crearUsers = async (name, surname, email, phone, password, register, address1, address2, number, door, city, province, country, postalCode) => {
  try {
    // Realizamos la validacion de que 2 usuarios no tengan el mismo email
    const emailFound = await User.findOne({ where: {email: email } });
    console.log(email);
    if (emailFound) {
      throw new Error('Email already exist');
    };
    console.log(password);
    if(password){
      // una vez recibida la password al crear el usuario la encryptamos para almacenarla en la DB
      let hashPassword = bcrypt.hashSync(password, 10);
      const nuevoUsuario = await User.create({
        name,
        surname,
        email,
        phone,
        password: hashPassword,
        address1,
        address2,
        number,
        door,
        city,
        province,
        country,
        postalCode,
      });
      return nuevoUsuario;
    } else {
      const UsuarioTerceros = await User.create({
        name,
        surname,
        email,
        phone,
        register
      })
      return UsuarioTerceros;
    };
  } catch (error) {
    console.error("Error al Registrarse:", error);
    return null;
  }
};
const changeUser = async (phone, password, address1, address2, number, door, city, province, country, postalCode) => {
  try {
    const cambiaUser = await UserProfile.update({
      // name,
      // surname,
      // email,
      phone,
      password: hashPassword,
      address1,
      address2,
      number,
      door,
      city,
      province,
      country,
      postalCode,
    });
    return cambiaUser;
  } catch (error) {
    console.error("Error en la Dirección:", error);
    return null;
  }
}

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

const deleteLogicalUser= async(userId)=> {//eliminar un usuario
  const user = await User.findByPk(userId);
  if(user.isDeleted){
  user.update({ isDeleted: false });
  }else{
    user.update({ isDeleted: true })}
}
const  getAllUsersAssets= async() =>{//consulta de usuarios activos
  const users = await User.findAll({
    where: { isDeleted: false },
  });
  return users;
}
module.exports = { users, crearUsers, changeUser, update, delet, getUserById,deleteLogicalUser,getAllUsersAssets };
