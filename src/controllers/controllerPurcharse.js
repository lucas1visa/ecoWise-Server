const { Purchase, Product } = require("../db");
const postPay = async (payment_id, payment_type, status, userId, quantity, idProduct) => {
    console.log(userId)
  try {
    const product = await Product.findByPk(idProduct);

    if (!product) {
      throw new Error("Producto no encontrado");
    }

    const purchase = await Purchase.create({
        payment_id:payment_id,
      payment_type: payment_type,
      status:status,
      UserId: userId
    });
    const currentQuantity =  await product.quantity;
    console.log(currentQuantity)
    const newQuantity = currentQuantity - quantity;
    // Actualizar la cantidad en la entrada existente
    await product.update({ quantity: newQuantity });
    await purchase.setProducts(idProduct)
    return purchase;
  } catch (error) {
    throw new Error("Error al procesar la compra: " + error.message);
  }
};

module.exports = {
  postPay
};
