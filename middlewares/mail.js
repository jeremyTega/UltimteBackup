const nodemailer = require("nodemailer");
require("dotenv").config();

// const sendEmail = async (options) => {
//     const transporter = nodemailer.createTransport({
//         host:"smtp.gmail.com",
//         service:"gmail",
//           port:587,
//         auth: {
//             user:process.env.user,
//             pass:process.env.password
//         },
//         tls:{
//             rejectUnauthorized: false,
//            },
//     });

//     const fromAddress = `"${process.env.from_Name}" <${process.env.user}>`;


//     try {
//         const info = await transporter.sendMail({
//             from: fromAddress,
//             to: options.email,
//             subject: options.subject,
//             html: options.html
//         });

//         console.log("Message sent: %s", info.messageId);
//         return info;
//     } catch (error) {
//         console.error("Error sending email:", error);
//         throw error;
//     }
// };




const sendEmail = async (options) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        service: "gmail",
        port: 587,
        auth: {
            user: process.env.user,
            pass: process.env.password
        },
        tls: {
            rejectUnauthorized: false,
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






module.exports = sendEmail;



