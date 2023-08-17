const { Op } = require('sequelize');
const { async } = require("rxjs");
const { Product } = require("../db");

const products = async () => {
  try {
    const todosLosProductos = await Product.findAll();
    return todosLosProductos;
  } catch (error) {
    console.error("Error al obtener los Productos:", error);
    return null;
  }
};

const crearProducts = async (
  name,
  description,
  price,
  quantityAvailable,
  category,
  image
) => {
  try {
    const nuevoProductos = await Product.create({
      name,
      description,
      price,
      quantityAvailable,
      category,
      image,
    });

    return nuevoProductos;
  } catch (error) {
    console.error("Error al Registrarse:", error);
    return null;
  }
};

const updateProducts = async (
  id,
  description,
  price,
  quantityAvailable,
  image
) => {
  try {
    const fullUpdate = await Product.update(
      {
        description: description,
        price: price,
        quantityAvailable: quantityAvailable,
        image: image,
      },
      {
        where: {
          id: id,
        },
      }
    );
  } catch (error) {
    throw error;
  }
};

const deletP = async (id) => {
  try {
    const getProducts = await Product.findByPk(id);

    if (getProducts) {
      getProducts.destroy();
      return "Deleted Producto";
    } else {
      throw Error("producto not found");
    }
  } catch (error) {
    throw error;
  }
};

const searchProductByName = async (name) => {
  const findProduct = await Product.findAll({ where: {
    name: {
      [Op.iLike]: `%${name}%`,
    },
  }})
  console.log('esto es lo que llega al SQL:' + findProduct)
  return findProduct;
}


const searchProductById = async (id) => {
 
  const findProductId = await Product.findAll({ where: { id: id } })
  return findProductId
}

const searchProductByCategory = async (category) => {
  const findProducto = await Product.findAll({ where: { category: category } })
  return findProducto;
}


module.exports = {
  products,
  crearProducts,
  updateProducts,
  deletP,
  searchProductByName,
  searchProductById,
  searchProductByCategory
};
