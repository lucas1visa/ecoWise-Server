const { Purchase, Product,Users } = require("../db");
const postPay = async (payment_id, payment_type, status, compras) => {
  try {
    compras.forEach(async e => {
      
      const product = await Product.findByPk(e.productId);
      
      if (!product) {
      throw new Error("Producto no encontrado");
    }
    const purchase = await Purchase.create({
        payment_id:payment_id,
      payment_type:payment_type,
      status: status,
      UserId: e.userId,
      quantity:e.cantidad,
      total:e.precio
    });
    const currentQuantity =  await product.quantityAvailable;
    const newQuantity = currentQuantity - e.cantidad;
    // Actualizar la cantidad en la entrada existente
    await product.update({ quantityAvailable: newQuantity });
    await purchase.setProducts(e.productId)
    return purchase;
  });
  } catch (error) {
    throw new Error("Error al procesar la compra: " + error.message);
  }
};

module.exports = {
  postPay
};
