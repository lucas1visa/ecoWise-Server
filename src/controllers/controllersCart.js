const {Cart,Product} = require("../db");

const getcarrito = async ()=>{
    try {
        const productosEnCarrito = await Cart.findAll();
        return productosEnCarrito;
      } catch (error) {
        console.error("Error al obtener los Productos del carrito de compras:", error);
        return null;
      }
}

const crearCart = async (id,quantityAvailable,UserId)=>{
    try {
    const nuevoProductoCarrito = await Cart.create({
        quantityAvailable,
        UserId
      });
      await nuevoProductoCarrito.setProducts(id)
      return nuevoProductoCarrito;
    } catch (error) {
      console.error("Error el producto al carrito de compras:", error);
      return null;
    }
}

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

module.exports = {
getcarrito,
crearCart,
updateCarrito
  };