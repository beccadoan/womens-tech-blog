const nodemailer = require("nodemailer");

require('dotenv').config()

async function main(event) {
    event.preventDefault();
    console.log('helloooooo');
    // element.find('.post-body')
        
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
        subject: "Check out this post",
        text: "Here's the post you emailed:",
        html: "<h1>Post</h1>"
    });

    console.log('Message sent', info.messageId);
}

// main().catch(console.error);
document.querySelector('.contact-us').addEventListener('submit', main);
