const nodemailer = require('nodemailer');

async function main() {
    let testAccount = await
    nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass
        },
    });

    let info = await transporter.sendMail({
        from: '"Cait" <cait@example.com>',
        to: "becca@example.com",
        subject: "Hello",
        text: "Hello world"
    });

    console.log('Message sent', info.messageId);
}

main().catch(console.error);