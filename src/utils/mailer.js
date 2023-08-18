const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        
        user: 'eco.wise.commerce@gmail.com',
        pass: 'pwrhqcsdoxiqhrvp'
    },
    

});

transporter.verify().then(() => {
    console.log('Ready for send emails');
})
const sendPurchaseConfirmationEmail = async (emailUser) => {
  try {
    const mailOptions = {
      from: '"ecoWise" <eco.wise.commerce@gmail.com>',
      to:emailUser,
      subject: 'Compra exitosa',
      html: `<p>Hola !!!,</p>
      <p>¡Gracias por elegir la sostenibilidad con tu compra en ecoWise Commerce!</p>
      <p>Tu elección de productos eco friendly es un paso valioso hacia un futuro más verde y sostenible.</p>
      <p>Con cada compra, estás contribuyendo a cuidar nuestro planeta y fomentar prácticas más amigables con el medio ambiente.</p>
      <p>Esperamos que disfrutes de tus nuevos productos y que te sientas inspirado a continuar tomando decisiones que marquen la diferencia.</p>
      <p>Si tienes alguna pregunta, sugerencia o simplemente quieres compartir tu experiencia con nosotros, no dudes en contactarnos.</p>
      <p>Gracias por ser parte de la comunidad de ecoWise Commerce y por unirte a nuestro esfuerzo por un mundo más sostenible.</p>
      <p>¡Disfruta de tus productos y del impacto positivo que estás generando!</p>
      <p>Saludos eco-amigables,</p>
      <p>El Equipo de ecoWise Commerce</p>`
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Purchase confirmation email sent:", info.response);
  } catch (error) {
    console.error("Error sending purchase confirmation email:", error);
  }
};

module.exports = {
  transporter,
  sendPurchaseConfirmationEmail
};
