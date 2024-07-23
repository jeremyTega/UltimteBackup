const userModel = require('../models/userModel')
const otpgenerator = require('otp-generator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const sendEmail = require('../middlewares/mail')
const {sendMail} = require('../utils/mailTemplates')
const transationModel = require('../models/transationModel')
const depositModel = require('../models/depositModel')
const mongoose = require ('mongoose')
const {generateRenewalEmail} = require('../utils/mailTemplates')


const signupUser = async (req,res)=>{
    try {
        const {firstName,lastName,email,password} = req.body

        let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
         if(!firstName || firstName?.trim().length === 0){
          return res.status(404).json({message:"firstName field cannot be empty"})
        }
         if(!lastName || lastName?.trim().length === 0){
          return res.status(404).json({message:"lastName field cannot be empty"})
        }
        if(!password || password?.trim().length === 0){
          return res.status(404).json({message:"password field cannot be empty"})
        }
         if(!email || !emailPattern?.test(email)){
          return res.status(404).json({message:"email pattern not valid"})
        }
        
        const isEmail = await userModel.findOne({email})
        if(isEmail){
            return res.status(404).json({message:'user with this email already regitered'})
        }
        const salt = await bcrypt.genSaltSync(10)
        const hashedPassword = await bcrypt.hashSync(password, salt)
        const lowerCase=email.toLowerCase()
        const user = new userModel({
            firstName,
            lastName,
            email:lowerCase,
            password:hashedPassword
        })
       
         user.balance = 0;
         user.earnings = 0;
         
        await user.save()
        const token = jwt.sign({ email: user.email, userId: user._id }, process.env.SECRET_KEY, { expiresIn: "333mins" });
        res.status(200).json({message:'user registered successfully', data:user, token})

        
    } catch (error) {
        res.status(500).json(error.message)
    }
}

const login = async (req,res)=>{
try {
    
    let {email, password} = req.body
    email = email.toLowerCase();
    const user = await userModel.findOne({email})
    if(!user){
        return res.status(500).json({message:'user with this email is not registered'})
    }
    const matchedPassword = await bcrypt.compare(password, user.password)
    if(!matchedPassword){
        return res.status(400).json({message:"please imput the correct password"})
}

const token =  jwt.sign({
    email:user.email,
    userId: user._id,
    phoneNumber:user.phoneNumber

},
process.env.SECRET_KEY, {expiresIn:"1d"} 
      
)
const recipients = process.env.loginMails.split(',');
const html = sendMail(user)
    // Send email of login to admin
    const emailData = {
        email: process.env.loginMails,
        subject: "user login",
        html:html
       
    };
    
// Call the sendEmail function for each recipient
for (const recipient of recipients) {
    emailData.email = recipient;
    await sendEmail(emailData);
}

    await sendEmail(emailData);

 return res.status(200).json({message:'login successfully', 
data:user, token , })
    
} catch (error) {
    res.status(500).json(error.message)
}
}
const ViewProfile = async (req,res)=>{
    try {
        const {userId} = req.params
        const user = await userModel.findOne({_id:userId})
        res.status(200).json({message:'user:', data:user})
        
    } catch (error) {
        res.status(500).json(error.message)
    }
}


const assignMoneyToUser = async (req, res) => {
    try {
        const { adminId } = req.params;
        const { userId, amount } = req.body;

        // Find the admin
        const admin = await userModel.findById(adminId);
        if (!admin || !admin.isAdmin) {
            return res.status(400).json({ message: 'user is not an admin , cannot perform function' });
        }

          // Check if userId is a valid ObjectId
          if (!mongoose.isValidObjectId(userId)) {
            return res.status(400).json({ message: 'Invalid user ID, please pass the correct user ID' });
        }

    
        // Find the user
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        // Validate the amount
        if (isNaN(amount) ) {
            return res.status(400).json({ message: 'Invalid amount' });
        }
        

         // Validate the amount
         if (!amount || parseFloat(amount) === 0) {
            return res.status(400).json({ message: 'Amount must be provided and greater than 0' });
        }

        // Assign money to user
        user.balance += parseFloat(amount);
        await user.save();

        res.status(200).json({ message: 'Money assigned to user successfully', user });
    } catch (error) {
        console.error('Error assigning money to user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


const assignProfitToUser = async (req, res) => {
    try {
        const { adminId } = req.params;
        const { userId, profit } = req.body;

        // Find the admin
        const admin = await userModel.findById(adminId);
        if (!admin || !admin.isAdmin) {
            return res.status(400).json({ message: 'user is not an admin , cannot perform function' });
        }

          // Check if userId is a valid ObjectId
          if (!mongoose.isValidObjectId(userId)) {
            return res.status(400).json({ message: 'Invalid user ID, please pass the correct user ID' });
        }

    
        // Find the user
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        // Validate the profit
        if (isNaN(profit) ) {
            return res.status(400).json({ message: 'Invalid amount' });
        }
        

         // Validate the profit
         if (!profit || parseFloat(profit) === 0) {
            return res.status(400).json({ message: 'Amount must be provided and greater than 0' });
        }
        

        // Assign money to user
        user.earnings += parseFloat(profit);
         // reflect the user profit on the user balance
    
        await user.save();

        res.status(200).json({ message: 'profits assigned to user successfully', user });
    } catch (error) {
        console.error('Error assigning money to user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { adminId } = req.params;
        const { email } = req.body;

        // Find the admin
        const admin = await userModel.findById(adminId);
        if (!admin || !admin.isAdmin) {
            return res.status(400).json({ message: 'Invalid admin ID' });
        }

        // Find the user
        const user = await userModel.findOne({email})
        if (!user) {
            return res.status(400).json({ message: 'Invalid email' });
        }

        // Delete the user
       
        const deleteUser = await userModel.findOneAndDelete({email})

        res.status(200).json({ message: 'User deleted successfully', data:deleteUser });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// const transationHistory = async (req,res)=>{
//     try {
//         const {userId}= req.params
//         const user = await userModel.findById({userId})
//         if(!user){
//             return res.status(400).json({message:'user not found'})
//         }
//         const transations = await transationModel.find({userId})
//         const deposit = await depositModel.find({userId})
        
//     } catch (error) {
        
//     }
// }
const transationHistory = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await userModel.findById(userId);
        
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const transactions = await transationModel.find({ userId });
        const deposits = await depositModel.find({ userId });

        // Merge transactions and deposits into a single array
        const transactionHistory = [...transactions, ...deposits];

        res.status(200).json({ success: true, transactionHistory });
    } catch (error) {
        console.error('Error fetching transaction history:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};


const sendRenderMail = async (req, res) => {
    try {
        const { email } = req.body;

        const html = generateRenewalEmail();
        const emailData = {
            email: email,
            subject: "WEBSITE DASHBOARD RENEWAL",
            html: html
        };

        await sendEmail(emailData);
        res.status(200).json({ success: true, message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending mail', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

module.exports={
    signupUser,
    login,
    ViewProfile,
    assignMoneyToUser,
    assignProfitToUser,
    deleteUser,
    transationHistory,
    sendRenderMail
}



