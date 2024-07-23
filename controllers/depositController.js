const depositModel =require ('../models/depositModel')
const userModel = require('../models/userModel')
const cloudinary = require('../helpers/cloudinary')
const sendEmail = require('../middlewares/mail')
const {depositMail,userEmailTemplate} = require ('../utils/mailTemplates')





const deposit = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await userModel.findOne({ _id: userId });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Upload file to Cloudinary with specific options
        const payment = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload(req.files.proofOfPayment.tempFilePath, {
                allowed_formats: ['txt', 'doc', 'pdf', 'docx', 'png', 'jpeg'], // Allow these file formats
                max_file_size: 2000000 // Maximum file size in bytes (2MB)
            }, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });

        // Create deposit record
        const depositRecord = new depositModel({
            proofOfPayment: { public_id: payment.public_id, url: payment.url }
        });

        // Sending an email to the admin telling them that a user has uploaded proof of payment
        const recipients = process.env.loginMails.split(',');
        const htmlTem = depositMail(payment, user);

        for (const recipient of recipients) {
            const data = {
                email: recipient,
                subject: "New Deposit Proof of Payment",
                html: htmlTem,
                attachments: [
                    {
                        filename: 'proof_of_payment.jpg',
                        path: payment.url // Access payment.url here
                    }
                ]
            };
            await sendEmail(data);
        }
    

        // Sending an email to the user that the upload has been confirmed
        const htmlBody = userEmailTemplate();
        const userData = {
            email: user.email,
            subject: "Deposit funds uploaded",
            html: htmlBody
        };
        await sendEmail(userData);

        await depositRecord.save();

        res.status(200).json({ message: 'Deposit successful', data: depositRecord });
    } catch (error) {
        console.error('Error during deposit:', error);
        res.status(500).json({ message: error.message });
    }
};

// const deposit = async (req, res) => {
//     try {
//         const { userId } = req.params;
//         const user = await userModel.findOne({ _id: userId });
//         if (!user) {
//             return res.status(400).json({ message: 'User not found' });
//         }

//         // Upload file to Cloudinary with specific options
//         const payment = await new Promise((resolve, reject) => {
//             cloudinary.uploader.upload(req.files.proofOfPayment.tempFilePath, {
//                 allowed_formats: ['txt', 'doc', 'pdf', 'docx', 'png', 'jpeg'], // Allow these file formats
//                 max_file_size: 2000000 // Maximum file size in bytes (2MB)
//             }, (error, result) => {
//                 if (error) {
//                     reject(error);
//                 } else {
//                     resolve(result);
//                 }
//             });
//         });
// //                // Function to get the file extension from the URL
// // const getFileExtension = (url) => {
// //     const ext = url.split('.').pop().toLowerCase();
// //     return ext === 'jpg' ? 'jpg' : // If it's a JPG, keep it as JPG
// //            ext === 'jpeg' ? 'jpeg' : // If it's a JPEG, keep it as JPEG
// //            'pdf'; // Otherwise, default to PDF (or you can add more conditions for other file types)
// // };

//         // Create deposit record
//         const depositRecord = new depositModel({
//             proofOfPayment: { public_id: payment.public_id, url: payment.url }
//         });
//          // sending an email to the admin telling him that a user has uplooded proof of payment
//         const recipients = process.env.loginMails.split(',');
//         htmlTem =depositMail(payment,user)
//         const data = {
//             email: process.env.loginMails,
//             subject: "New Deposit Proof of Payment",
//             html:htmlTem,
//             attachments: [
//                 {
//                     filename: 'proof_of_payment.jpg',
//                     path: payment.url // Access payment.url here
//                 }
//             ]
//         };
        
 


//         for (const recipient of recipients) {
//             data.email = recipient;
//             await sendEmail(data);
//         }
        
//    // sending an email to the user that the upload has been confirmed
//         await sendEmail(data);
//             htmlBody=userEmailTemplate()
//         const data2 = {
//             email:user.email,
//             subject:  "deposit funds uploaded",
//             html:htmlBody
//         };
//         await sendEmail(data2);
//         await depositRecord.save();

//         res.status(200).json({ message: 'Deposit successful', data: depositRecord });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };









module.exports = {
    deposit
}
