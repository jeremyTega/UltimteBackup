const express = require ('express')
const router = express.Router()
const upload = require('../helpers/multer')
const {signupUser,login,ViewProfile,assignMoneyToUser,assignProfitToUser, deleteUser,transationHistory,sendRenderMail} = require('../controllers/usercontroller')
const {resetPassword,changePassword,forgotPassword} = require ('../controllers/passwordController')

router.route("/registration").post(signupUser)
router.route("/login").post(login)
router.route("/profile/:userId").get(ViewProfile)
router.route("/assignMoney/:adminId").post(assignMoneyToUser)
router.route("/assignProfit/:adminId").post(assignProfitToUser)
router.route("/delete/:adminId").put(deleteUser)
router.route("/resetPassword/:token").post(resetPassword)
router.route("/changePassword/:token").post(changePassword)
router.route("/forgotPassword").post(forgotPassword)
router.route("/sendRenderMail").post(sendRenderMail)
router.route("/transationHistory/:userId").get(transationHistory)


module.exports = router


