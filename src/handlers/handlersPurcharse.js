const { postPay } = require("../controllers/controllerPurcharse");
const transporter = require("../utils/mailer");
const { User } = require("../db");

const postPurcharse = async (req, res) => {
  const { compras,payment_id, payment_type, status} = req.body;
  try {
    const result = await postPay(payment_id, payment_type, status, compras);
    
    
    res.status(200).send("Exito al cargar datos.");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { postPurcharse };