const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        
        user: 'eco.wise.commerce@gmail.com',
        pass: 'pwrhqcsdoxiqhrvp'
    },
    tls: {
        rejectUnauthorized: false // Desactivar la validación del certificado en TLS
    }

});

transporter.verify().then(() => {
    console.log('Ready for send emails');
})

module.exports = transporter;
