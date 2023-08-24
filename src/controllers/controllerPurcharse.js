const { Purchase, Product, User } = require("../db");
const { sendPurchaseConfirmationEmail } = require("../utils/mailer");

const postPay = async (payment_id, payment_type, status, compras) => {
  try {
    const purchasePromises = compras.map(async e => {
      const product = await Product.findByPk(e.productId);

      if (!product) {
        throw new Error("Producto no encontrado");
      }

      const purchase = await Purchase.create({
        payment_id: payment_id,
        payment_type: payment_type,
        status: status,
        UserId: e.userId,
        quantity: e.cantidad,
        total: e.precio
      });

      const currentQuantity = await product.quantityAvailable;
      const newQuantity = currentQuantity - e.cantidad;

      await product.update({ quantityAvailable: newQuantity });
      await purchase.setProducts(e.productId);

      // Obtener el objeto User
      const user = await User.findByPk(e.userId);

      if (!user) {
        throw new Error("Usuario no encontrado");
      }

      // Acceder a la dirección de correo electrónico
      const userEmail = user.email;

      // Enviar el correo electrónico de confirmación
      await sendPurchaseConfirmationEmail(userEmail);

      return purchase;
    });

    return Promise.all(purchasePromises);
  } catch (error) {
    throw new Error("Error al procesar la compra: " + error.message);
  }
};

module.exports = {
  postPay
};