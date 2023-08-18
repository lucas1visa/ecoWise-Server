const { postPay } = require("../controllers/controllerPurcharse");
const transporter = require("../utils/mailer");
const { User } = require("../db");

const postPurcharse = async (req, res) => {
  const { quantity, userId, idProduct, payment_id, payment_type, status } = req.body;
  try {
    const result = await postPay(payment_id, payment_type, status, userId, quantity, idProduct);
    
    const user = await User.findByPk(userId);

    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    const emailUser = user.email;

    // Assuming result includes the associated product details
    
    
    await transporter.sendPurchaseConfirmationEmail(emailUser); // Include purchaseDetails here
    
    res.status(200).send("Exito al cargar datos.");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { postPurcharse };