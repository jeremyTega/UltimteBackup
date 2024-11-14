const depositModel =require ('../models/depositModel')
const userModel = require('../models/userModel')
const cloudinary = require('../helpers/cloudinary')
const sendEmail = require('../middlewares/mail')
const {depositMail,userEmailTemplate} = require ('../utils/mailTemplates')




const deposit = async (req, res) => {
    try {
        const { userId } = req.params;
        console.log("Received request for user:", userId);

        const user = await userModel.findOne({ _id: userId });
        if (!user) {
            console.log("User not found");
            return res.status(400).json({ message: 'User not found' });
        }

        // Check if proof of payment file exists
        if (!req.files || !req.files.proofOfPayment) {
            console.log("Proof of payment file is missing in the request");
            return res.status(400).json({ message: 'Proof of payment file is required' });
        }

        // Save deposit record early to avoid delay at the end
        const depositRecord = new depositModel({
            user: userId,
            proofOfPayment: {}, // Will be updated after Cloudinary upload
        });
        await depositRecord.save();
        console.log("Initial deposit record saved");

        // Parallelize Cloudinary upload
        console.log("Uploading file to Cloudinary...");
        const payment = await cloudinary.uploader.upload(req.files.proofOfPayment.tempFilePath, {
            allowed_formats: ['txt', 'doc', 'pdf', 'docx', 'png', 'jpeg'],
            max_file_size: 2000000,
        });

        depositRecord.proofOfPayment = { public_id: payment.public_id, url: payment.url };
        await depositRecord.save(); // Save proof of payment info in deposit record

        // Generate email data in parallel
        const recipients = process.env.loginMails?.split(',').filter(email => email.trim() !== '');
        const htmlTem = depositMail(payment, user);
        const htmlBody = userEmailTemplate();

        // Parallelize email sending to admins and the user
        const emailPromises = [
            ...recipients.map((recipient) => {
                const adminEmailData = {
                    email: recipient,
                    subject: "New Deposit Proof of Payment",
                    html: htmlTem,
                    attachments: [
                        {
                            filename: 'proof_of_payment.jpg',
                            path: payment.url,
                        },
                    ],
                };
                return sendEmail(adminEmailData);
            }),
            sendEmail({
                email: user.email,
                subject: "Deposit funds uploaded",
                html: htmlBody,
            }),
        ];

        await Promise.all(emailPromises); // Send emails in parallel
        console.log("Emails sent to admins and user");

        res.status(200).json({ message: 'Deposit successful', data: depositRecord });
    } catch (error) {
        console.error('Error during deposit:', error);
        res.status(500).json({ message: error.message });
    }
};




module.exports = {
    deposit
}
