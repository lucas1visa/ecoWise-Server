const {createFav,delFav,getFav} = require("../controllers/controllerFavorites")

const addFavorites = async(req,res)=>{
    try {
        let {id,UserId,favorito} = req.body;
       
        let newFav = await createFav(id,UserId,favorito);
        if(newFav){
           return res.status(200).send(`Favorites Add+${newFav}`)
        }
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


const getFavorites = async(req,res) =>{
    try {
        todosLosFavoritos = await getFav()
        res.status(200).json(todosLosFavoritos);
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

const deletFavorites = async(req,res)=>{
    try {
        let {id,UserId} = req.body;
        console.log(id,UserId)
        let notFavorite = await delFav(id,UserId);
        res.status(200).send("Favorite Delete")
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}


module.exports = {addFavorites,getFavorites,deletFavorites}