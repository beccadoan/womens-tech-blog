const nodemailer = require('nodemailer');

require('dotenv').config()

async function main() {
    let transporter = nodemailer.createTransport({
        host: "smtp.office365.com",
        port: 587,
        secure: false,
        auth: {
            user: "womenstechblog@outlook.com",
            pass: process.env.OU_PW
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    let info = await transporter.sendMail({
        from: '"Womens Tech Blog" <womenstechblog@outlook.com>',
        to: "womenstechblog@gmail.com",
        subject: "Contact request",
        text: "Contact form submitted",
        html: "<h3>Name: ${name}</h3>"
    });

    console.log('Message sent', info.messageId);
}

main().catch(console.error);
document.querySelector('.contact-btn').addEventListener('submit', main);
