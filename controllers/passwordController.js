const userModel  = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const {forgetMail} = require('../utils/mailTemplates')
const sendEmail = require('../middlewares/mail')

const resetPassword = async (req, res) => {
  try {
      const { token } = req.params;
      const { newPassword, confirmNewPassword } = req.body;

      // Verify the user's token
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

      // Get the user's Id from the token
      const userId = decodedToken.userId;

      // Find the user by ID
      const user = await userModel.findById(userId);
      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }

      // Check if the new password matches the confirmation
      if (newPassword !== confirmNewPassword) {
          return res.status(400).json({ message: 'Passwords do not match' });
      }

      // Salt and hash the new password
      const saltedRound = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, saltedRound);

      // Update the user's password
      user.password = hashedPassword;
      await user.save();

      return res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
      console.error("Something went wrong", error.message);
      return res.status(500).json({ message: "Internal server error" });
  }
};


  const changePassword = async (req, res) => {
    try {
      const { token } = req.params;
      const {NewPassword, currentPassword } = req.body;
  
      // Verify the user's token
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

      // Get the user's Id from the token
      const userId = decodedToken.userId;
  
      // Find the user by ID
      const user = await userModel.findById(userId);
      
      if (!user) {
        return res.status(404).json({
          message: "User not found"
        });
      }
  
      // Confirm the previous password
      const isPasswordMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isPasswordMatch) {
        return res.status(401).json({
          message: "Existing password does not match"
        });
      }
  
      // Salt and hash the new password
      const saltedRound = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(NewPassword, saltedRound);
  
      // Update the user's password
      user.password = hashedPassword;
      await user.save();
  
      res.status(200).json({
        message: "Password changed successful"
      });
    } catch (error) {
      console.error("Something went wrong", error.message);
      res.status(500).json({
        message: error.message
      });
    }
  }
  const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if the email exists in the userModel
    if (!email || !email.trim()) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    const user = await userModel.findOne({ email: email.trim().toLowerCase() });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    console.log("User found:", user);

    // Generate a reset token
    const token = jwt.sign(
      { userId: user._id },
      process.env.SECRET_KEY,
      { expiresIn: "20m" }
    );

    // Construct the reset password link
    const resetLink = `https://ultimate-tradefx-djva.onrender.com/#/reset_password/${token}`;

    // Prepare email content using the forgetMail function
    const forgetHtml = forgetMail(resetLink);

    const mailOptions = {
      email: user.email,
      subject: "Password Reset",
      html: forgetHtml,
    };

    // Send the password reset email
    await sendEmail(mailOptions);

    res.status(200).json({
      message: "Password reset email sent successfully",
      token, // Optional: Include the token only if needed for debugging
    });
  } catch (error) {
    console.error("Error in forgotPassword function:", error.message);

    res.status(500).json({
      message: "Internal server error. Please try again later.",
    });
  }
};



  module.exports= {
    resetPassword,
    changePassword,
    forgotPassword
  }
  