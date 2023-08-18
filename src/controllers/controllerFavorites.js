const {Favorite, Product} = require("../db")

const createFav = async(id,UserId)=>{
    console.log('userId: '+UserId)
    try {
        const newFavorite = await Favorite.create({UserId})
        await newFavorite.setProducts(id)
        return newFavorite
    } catch (error) {
        return error;
    }
};

const delFav = async(name)=>{
    try {
        let foundFav = await Favorite.findOne({where: {name: name}});
        if(foundFav){
            let Favdelete = await foundFav.destroy()
            return "Favorite Delete with success";
        }else{
            throw new Error("Favorite not found")
        }
    } catch (error) {
        return error;
    }
}

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