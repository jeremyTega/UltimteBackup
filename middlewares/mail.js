const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = async (options) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587, // TLS port
        secure: false, // Use STARTTLS
        auth: {
            user: process.env.user, // Your email address
            pass: process.env.password, // Your email password or App Password
        },
        tls: {
            rejectUnauthorized: false, // Accept self-signed certificates
        },
    });

    const fromAddress = `"${process.env.from_Name}" <${process.env.user}>`;

    try {
        if (!options.email) {
            throw new Error('No recipients defined');
        }

        const info = await transporter.sendMail({
            from: fromAddress,
            to: options.email,
            subject: options.subject,
            html: options.html,
            attachments: options.attachments
        });

        console.log("Message sent: %s", info.messageId);
        return info;
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
};

module.exports = sendEmail;










