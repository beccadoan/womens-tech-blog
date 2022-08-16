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
        to: `${req.session.email}`,
        subject: "Check out this post",
        text: "Here's the post you emailed:",
        html: `${post.id}`
    });

    console.log('Message sent', info.messageId);
}

main().catch(console.error);
document.querySelector('.contact-btn').addEventListener('submit', main);
