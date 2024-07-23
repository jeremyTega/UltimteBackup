const express = require ('express')
const router = express.Router()
const {investOne,investTwo,investThree,investFour,investFive,calculateTotalInvestmentCount,calculateTotalProfit,getTotalBalance,withdrawMoney} = require('../controllers/investmestController')

router.route("/investOne/:userId").post(investOne)
router.route("/investTwo/:userId").post(investTwo)
router.route("/investThree/:userId").post(investThree)
router.route("/investFour/:userId").post(investFour)
router.route("/investFive/:userId").post(investFive)
router.route("/calInv/:userId").get(calculateTotalInvestmentCount)
router.route("/calTotalProfits/:userId").get(calculateTotalProfit)
router.route("/totalBalance/:userId").get(getTotalBalance)
router.route("/withdrawMoney/:userId").post(withdrawMoney)


module.exports = router
