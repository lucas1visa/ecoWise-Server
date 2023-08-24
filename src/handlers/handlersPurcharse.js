const { postPay } = require("../controllers/controllerPurcharse");
const { sendPurchaseConfirmationEmail } = require("../utils/mailer"); // Asegúrate de que la ruta sea correcta
const { User } = require("../db");

const postPurcharse = async (req, res) => {
  const { compras, payment_id, payment_type, status } = req.body;
  try {
    const result = await postPay(payment_id, payment_type, status, compras);

    // Obtén el ID del usuario que realizó la compra
    const userId = compras[0].userId;

    // Obtén el correo electrónico del usuario desde la base de datos
    const user = await User.findByPk(userId);

    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    const userEmail = user.email;

    // Envía el correo de confirmación al usuario
    await sendPurchaseConfirmationEmail(userEmail);

    res.status(200).send("Exito al cargar datos.");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { postPurcharse };