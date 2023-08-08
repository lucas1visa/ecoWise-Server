require("dotenv").config();
const tokenND = process.env.Token_ND;
console.log(tokenND);

const mercadopago = require("mercadopago");

mercadopago.configure({
  access_token: tokenND,
});

const getMercadopago=(req, res)=> {
  res.send("ruta de mercado pago funcionando");
};

const postMercadopago=(req, res) => {
  let preference = {
    items: [
      {
        title: req.body.description,
        unit_price: Number(req.body.price),
        quantity: Number(req.body.quantity),
      },
    ],
    back_urls: {
      success: "http://localhost:5173/home",
      failure: "http://localhost:5173",
      pending: "",
    },
    auto_return: "approved",
  };

  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      res.json({
        id: response.body.id,
      });
    })
    .catch(function (error) {
      console.log(error);
    });
}
;
module.exports = { postMercadopago,getMercadopago}
