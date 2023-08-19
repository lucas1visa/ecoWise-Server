const {Cart,Product} = require("../db");

const getcarrito = async ()=>{
  try {
      const productosEnCarrito = await Cart.findAll({
        include:{
          model: Product,
          attributes:['name', 'price', 'quantityAvailable', 'image',"id"]
        }
      });
      return productosEnCarrito;
    } catch (error) {
      console.error("Error al obtener los Productos del carrito de compras:", error);
      return null;
    }
}

const crearCart = async (id,UserId,carrito)=>{
    try {
      if(id){//tengo un solo id de producto? // if para un solo registro
    const nuevoProductoCarrito = await Cart.create({
        UserId
      });
      await nuevoProductoCarrito.setProducts(id)
      return nuevoProductoCarrito
    }
    //caso de multiples registros
      const nuevoCarrito = await Cart.create({
        UserId
      })
      carrito.forEach(async (producto) => {//iterar [{info.id},{info.id}]
        await nuevoCarrito.setProducts(producto.id)//relacionar multiples productos con mi carrito
      });
      return nuevoCarrito
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

const deletCart = async (idProduct,UserId) => {

  try {
    let foundCart = await Cart.findOne({
      where: {
        UserId: UserId,
      },
      include: {
        model: Product,
        where: {
          id: idProduct,
        },
      },
    });
    if (foundCart) {
      await foundCart.destroy()
      return "eliminao";
    } else {
      throw new Error("no eliminao");
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