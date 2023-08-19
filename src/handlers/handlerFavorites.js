const {createFav,delFav,getFav} = require("../controllers/controllerFavorites")

const addFavorites = async(req,res)=>{
    try {
        let {id,UserId} = req.body;
        let newFav = await createFav(id,UserId);
        if(newFav){
           return res.status(200).send(`Favorites Add+${newFav}`)
        }
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


const getFavorites = async(req,res) =>{
    try {
        res.status(200).json(getFav());
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

const deletFavorites = async(req,res)=>{
    try {
        let {name} = req.body;
        let notFavorite = await delFav(name);
        res.status(200).send("Favorite Delete")
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}


module.exports = {addFavorites,getFavorites,deletFavorites}