const express = require ('express')
const router = express.Router()
const {deposit} = require('../controllers/depositController')
const upload = require('../helpers/multer')

 router.route("/DepositFunds/:userId").post(deposit);
    


 module.exports = router

