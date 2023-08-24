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
const sendPurchaseConfirmationEmail = async (userEmail) => {
    try {
        const mailOptions = {
            from: '"ecoWise" <eco.wise.commerce@gmail.com>',
            to: userEmail,
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
const sendWelcomeEmail = async (email, name) => {
    try {
        const mailOptions = {
            from: '"ecoWise" <eco.wise.commerce@gmail.com>',
            to: email,
            subject: "¡Bienvenido a ecoWise Commerce!",
            html: `
            <p>Hola ${name},</p>
            <p>¡Bienvenido a ecoWise Commerce! Estamos emocionados de tenerte en nuestra comunidad.</p>
            <p>Con ecoWise Commerce, tendrás acceso a una variedad de productos sostenibles.</p>
            <p>Creemos en generar un impacto positivo en el medio ambiente, y tu apoyo es crucial en nuestro camino.</p>
            <p>Siéntete libre de explorar nuestra aplicación y descubrir soluciones amigables con el medio ambiente.</p>
            <p>Si tienes alguna pregunta o necesitas ayuda, no dudes en contactar a nuestro equipo de soporte.</p>
            <p>Gracias por elegir ecoWise Commerce. ¡Juntos podemos crear un futuro más verde!</p>
            <p>Saludos cordiales,</p>
            <p>El Equipo de ecoWise</p>
            <p><a href="https://ecowise-web-site.vercel.app/">https://ecowise-web-site.vercel.app/</a></p>
          ` 
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Correo de bienvenida enviado:", info.response);
    } catch (error) {
        console.error("Error al enviar el correo de bienvenida:", error);
    }
};
const sendMailChangePass = async(email,token) =>{
    try {
        const mailOptions = {
            from: '"ecoWise" <eco.wise.commerce@gmail.com>',
            to: email,
            subject: "¡Bienvenido a ecoWise Commerce!",
            html: `
            <p>Hola Usuario,</p>
            <p>Hemos registrado tu peticion para recuperar password.</p>
            <p>Queremos comunicarte que nuestro equipo trabaja la seguridad de tu informacion.</p>
            <p>Para ello te recomendamos actualizar(cambiar) la password.</p>
            <p>En el siguiente link te redireccionara para realizar dicha accion.</p>
            <p><a href="https://ecowise-web-site.vercel.app/changepassword?token=${token}">https://ecowise-web-site.vercel.app/</a></p>
            <p>Si tienes alguna pregunta o necesitas ayuda, no dudes en contactar a nuestro equipo de soporte.</p>
            <p>Gracias por elegir ecoWise Commerce. ¡Juntos podemos crear un futuro más verde!</p>
            <p>Saludos cordiales,</p>
            <p>El Equipo de ecoWise</p>
            ` 
        };
        const info = await transporter.sendMail(mailOptions);
        console.log("Correo de bienvenida enviado:", info.response);
    } catch (error) {
    console.error("Error al enviar el correo de bienvenida:", error);
    }
}

const sendConfirmationEmail = async (email, name) => {
    try {
        const mailOptions = {
            from: '"ecoWise" <eco.wise.commerce@gmail.com>',
            to: email,
            subject: "¡Bienvenido a ecoWise Commerce!",
            html: `
            <p>Hola ${name},</p>
            <p>¡Bienvenido a ecoWise Commerce! Estamos emocionados de tenerte en nuestra comunidad.</p>
            <p>Con ecoWise Commerce, tendrás acceso a una variedad de productos sostenibles.</p>
            <p>Creemos en generar un impacto positivo en el medio ambiente, y tu apoyo es crucial en nuestro camino.</p>
            <p>Siéntete libre de explorar nuestra aplicación y descubrir soluciones amigables con el medio ambiente.</p>
            <p>Por favor, confirma tu dirección de correo electrónico haciendo clic en el siguiente enlace:</p>
            <p><a href="https://ecowise-web-site.vercel.app/">https://ecowise-web-site.vercel.app/</a></p>
            <p>Si tienes alguna pregunta o necesitas ayuda, no dudes en contactar a nuestro equipo de soporte.</p>
            <p>Gracias por elegir ecoWise Commerce. ¡Juntos podemos crear un futuro más verde!</p>
            <p>Saludos cordiales,</p>
            <p>El Equipo de ecoWise</p>
            <p><a href="https://ecowise-web-site.vercel.app/">https://ecowise-web-site.vercel.app/</a></p>
            `
        };

        // Aquí deberías tener tu código para enviar el correo, como el uso de la librería "nodemailer" y el objeto "transporter".

        const info = await transporter.sendMail(mailOptions);
        console.log("Correo de confirmación enviado:", info.response);
    } catch (error) {
        console.error("Error al enviar el correo de bienvenida:", error);
    }
};

module.exports = {
    transporter,
    sendPurchaseConfirmationEmail,
    sendWelcomeEmail,
    sendMailChangePass,
    sendConfirmationEmail
};
