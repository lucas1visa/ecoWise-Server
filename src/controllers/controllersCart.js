const {Cart,Product} = require("../db");

const getcarrito = async ()=>{
  try {
      const productosEnCarrito = await Cart.findAll({
        include:{
          model: Product,
          attributes:['name', 'price', 'quantityAvailable', 'image']
        }
      });
      return productosEnCarrito;
    } catch (error) {
      console.error("Error al obtener los Productos del carrito de compras:", error);
      return null;
    }
}

const crearCart = async (id, UserId, carrito) => {
  try {
    if (id) {
      const nuevoProductoCarrito = await Cart.create({
        UserId
      });

      await nuevoProductoCarrito.setProducts(id);
      return nuevoProductoCarrito;
    } else {
      const nuevosCarritos = await Cart.create({
        UserId
      });
      // Crear un nuevo objeto Cart para manejar los productos del carrito
      const nuevoCarrito = await Cart.create({
        UserId
      });
      // Iterar sobre los productos en carrito y agregarlos al nuevo carrito
      carrito.forEach(async (producto) => {
        await nuevoCarrito.setProducts(producto.id);
      });

      return nuevoCarrito;
    }
  } catch (error) {
    console.error("Error al agregar el producto al carrito de compras:", error);
    return null;
  }
};

// no incluyo el nombre porque siempre va a ser el mismo nombre
const updateCarrito = async (  id, price, quantityAvailable, image)=>{
    try {
        const cargaDeDatosNuevos = await Cart.update(
          {
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
        return cargaDeDatosNuevos
      } catch (error) {
        throw error;
      }
}

const deletCart = async (id) => {

  try {
    const getDeleteCart = await Cart.findByPk(id);

    if (getDeleteCart) {
      getDeleteCart.destroy();
      return "Deleted Product Cart";
    } else {
      throw Error("Cart Product not found")
    }
  } catch (error) {
    throw error;
  }
}

module.exports = {
getcarrito,
crearCart,
updateCarrito,
deletCart
  };