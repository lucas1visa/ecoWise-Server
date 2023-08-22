const {createRev,delRev,getRev} = require("../controllers/controllerReview")

const addReview = async (req, res) => {
    try {
      const { id, UserId, review, rating, comment } = req.body;
  
      const newRev = await createRev(id, UserId, review, rating, comment); 
      if (newRev instanceof Error) {
        throw new Error(newRev.message);
      }
  
      return res.status(200).send(`Review Added: ${newRev}`);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  

const getReview = async(req,res) =>{
    try {
        todosLosreviews = await getRev()
        res.status(200).json(todosLosreviews);
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

const deletReview = async(req,res)=>{
    try {
        let {id,UserId} = req.body;
        console.log(id,UserId)
        let notReview = await delRev(id,UserId);
        res.status(200).send("Review Delete")
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}


module.exports = {addReview,getReview,deletReview}