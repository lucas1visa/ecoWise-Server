const {Favorite, Product} = require("../db")

const createFav = async(id,UserId)=>{
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

const getFav = async()=>{
    try {
        let foundAllFav = await Favorite.findAll()
        if(foundAllFav===null){
            throw new Error('Not have Favorites')
        }else{
            return foundAllFav;
        }
    } catch (error) {
        return error;
    }
}

module.exports = {createFav,delFav,getFav};