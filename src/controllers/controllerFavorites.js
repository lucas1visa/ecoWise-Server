const {Favorite, Product} = require("../db")

const createFav = async (id, UserId, favorito) => {
    try {
      if (id) {
        const newProductFavorite = await Favorite.create({
          UserId,
        });
        await newProductFavorite.setProducts(id);
        return newProductFavorite;
      }
      const newFavorite = await Favorite.create({ UserId });
      favorito.forEach(async (producto) => {
        await newFavorite.setProducts(producto.id);
      });
      return newFavorite;
    } catch (error) {
      return error;
    }
  };

  const delFav = async (idProduct, UserId) => {
    try {
      let foundFav = await Favorite.findOne({
        where: {
          UserId: UserId,//modelo FAVORITO UserId === UserId
        },
        include: {
          model: Product,
          where: {
            id: idProduct,
          },
        },
      });
      if (foundFav) {
        await foundFav.destroy()
        return "eliminao";
      } else {
        throw new Error("no eliminao");
      }
    } catch (error) {
      return error;
    }
  };
  

const getFav = async ()=>{
    try {
        const productosEnFavorito = await Favorite.findAll({
          include:{
            model: Product,
            attributes:['name', 'price', 'description', 'image',"id"]
          }
        });
        return productosEnFavorito;
      } catch (error) {
        console.error("Error al obtener los Productos del favorito:", error);
        return null;
      }
  }

module.exports = {createFav,delFav,getFav};