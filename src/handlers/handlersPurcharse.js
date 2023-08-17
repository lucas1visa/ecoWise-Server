const {postPay} = require("../controllers/controllerPurcharse")
const postPurcharse = async (req, res) => {
    // const {payment_id,payment_type,status} = req.query; 
    const {quantity,userId,idProduct,payment_id,payment_type,status}= req.body
    try {
        result = await postPay(payment_id,payment_type,status,userId,quantity,idProduct)
      res.status(200).send("Exito al cargar datos.");

    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  module.exports = {postPurcharse}