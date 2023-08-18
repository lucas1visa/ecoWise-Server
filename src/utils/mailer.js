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
      from: 'eco.wise.commerce@gmail.com',
      to:emailUser,
      subject: 'Compra exitosa',
      text: `¡Gracias por tu compra!`
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
