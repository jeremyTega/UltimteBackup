const userModel = require('../models/userModel');
const investmentModel = require('../models/transationModel');
const sendEmail = require('../middlewares/mail')
const {userWithdrawMail} = require('../utils/mailTemplates')

// const investOne = async (req, res) => {
//     try {
//         const { userId } = req.params;
//         // const { amount } = req.body;
       

//         // Find the user
//         const user = await userModel.findById(userId);
      
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         // Check if the user has sufficient balance
//         if (user.balance  < 1000) {
//             return res.status(400).json({ message: 'Insufficient balance' });
//         }
//          // Check if the investment amount is exactly 1000
//         //  if (amount !== 1000) {
//         //     return res.status(400).json({ message: 'Investment amount must be exactly 1000' });
//         // }

//         // Deduct the investment amount from the user's balance
//         user.balance -= 1000;


//         if (user.earnings >= 1000) {
//             user.earnings -= 1000;
//         }
         
//         await user.save();

//         // Create the investment record
//         const investment = await investmentModel.create({ userId, plan: 1000 });

//         // Set up recurring profit calculation
//         setInterval(async () => {
//             // Calculate profit (0.7% of the plan)
//             const profit = 1000 * 0.007;
//         user.earnings += profit
//             // Add profit to user's balance
//             user.balance += profit;
//             await user.save();


//             // Log or handle the profit calculation as needed
//             // console.log(`Profit of ${profit} added to user ${userId} for plan ${plan}`);
//         }, 20000); // Run every hour (3600000 milliseconds)


//         res.status(200).json({ message: 'Investment successful', investment, user });
//     } catch (error) {
//         console.error('Error investing:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };
const investOne = async (req, res) => {
    try {
        const { userId } = req.params;

        // Find the user
        const user = await userModel.findById(userId);
      
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the user has sufficient balance
        if (user.balance < 1000) {
            return res.status(400).json({ message: 'Insufficient balance' });
        }

        // Deduct the investment amount from the user's balance
        user.balance -= 1000;

        // Deduct the investment amount from the user's earnings if earnings are sufficient
        if (user.earnings >= 1000) {
            user.earnings -= 1000;
        }

        // Save the user after deducting the investment amount
        await user.save();

        // Create the investment record
        const investment = await investmentModel.create({ userId, plan: 1000 });

        // Set up recurring profit calculation
        // setInterval(async () => {
        //     // Calculate profit (0.7% of the plan)
        //     const profit = 1000 * 0.007;
            
        //     // Fetch the user again to ensure we have the latest data
        //     const updatedUser = await userModel.findById(userId);

        //     // Add profit to user's earnings and balance
        //     updatedUser.earnings += profit;
        //     updatedUser.balance += profit;

        //     // Save the updated user document
        //     await updatedUser.save();

        //     // Log or handle the profit calculation as needed
        //     // console.log(`Profit of ${profit} added to user ${userId} for plan ${plan}`);
        // }, 360000); // Run every hour (3600000 milliseconds)

        res.status(200).json({ message: 'Investment successful', investment, user });
    } catch (error) {
        console.error('Error investing:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};




    


const investTwo = async (req, res) => {
    try {
        const { userId } = req.params;
       

        // Find the user
        const user = await userModel.findById(userId);
      
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the user has sufficient balance
        if (user.balance  < 10000) {
            return res.status(400).json({ message: 'Insufficient balance' });
        }

        // Deduct the investment amount from the user's balance
        user.balance -= 10000;
        // Deduct the investment amount from the user's earnings if earnings are sufficient
        if (user.earnings >= 10000) {
            user.earnings -= 10000;
        }
        await user.save();

        // Create the investment record
        const investment = await investmentModel.create({ userId, plan: 10000 });

        // Set up recurring profit calculation
//         setInterval(async () => {
//             // Calculate profit (0.7% of the plan)
//             const profit = 10000 * 1.5;
// // Fetch the user again to ensure we have the latest data
// const updatedUser = await userModel.findById(userId);

// // Add profit to user's earnings and balance
// updatedUser.earnings += profit;
// updatedUser.balance += profit;

// // Save the updated user document
// await updatedUser.save();

//             // Log or handle the profit calculation as needed
//             // console.log(`Profit of ${profit} added to user ${userId} for plan ${plan}`);
//         }, 360000); // Run every hour (3600000 milliseconds)

        res.status(200).json({ message: 'Investment successful', investment, user });
    } catch (error) {
        console.error('Error investing:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const investThree = async (req, res) => {
    try {
        const { userId } = req.params;
       

        // Find the user
        const user = await userModel.findById(userId);
      
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the user has sufficient balance
        if (user.balance  < 50000) {
            return res.status(400).json({ message: 'Insufficient balance' });
        }

        // Deduct the investment amount from the user's balance
        user.balance -= 50000;
        if (user.earnings >= 50000) {
            user.earnings -= 50000;
        }

        await user.save();

        // Create the investment record
        const investment = await investmentModel.create({ userId, plan: 50000 });

        // Set up recurring profit calculation
//         setInterval(async () => {
//             // Calculate profit (0.7% of the plan)
//             const profit = 50000 * 2.1;

// // Fetch the user again to ensure we have the latest data
//             const updatedUser = await userModel.findById(userId);

//             // Add profit to user's earnings and balance
//             updatedUser.earnings += profit;
//             updatedUser.balance += profit;

//             // Save the updated user document
//             await updatedUser.save(); 

//             // Log or handle the profit calculation as needed
//             // console.log(`Profit of ${profit} added to user ${userId} for plan ${plan}`);
//         }, 360000); // Run every hour (3600000 milliseconds)

        res.status(200).json({ message: 'Investment successful', investment, user });
    } catch (error) {
        console.error('Error investing:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const investFour= async (req, res) => {
    try {
        const { userId } = req.params;
       

        // Find the user
        const user = await userModel.findById(userId);
      
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the user has sufficient balance
        if (user.balance  < 200000) {
            return res.status(400).json({ message: 'Insufficient balance' });
        }

        // Deduct the investment amount from the user's balance
        user.balance -= 200000;
        if (user.earnings >= 200000) {
            user.earnings -= 200000;
        }

        await user.save();

        // Create the investment record
        const investment = await investmentModel.create({ userId, plan: 200000 });

        // // Set up recurring profit calculation
        // setInterval(async () => {
        //     // Calculate profit (0.7% of the plan)
        //     const profit = 200000 * 2.5;


        //    // Fetch the user again to ensure we have the latest data
        //    const updatedUser = await userModel.findById(userId);

        //    // Add profit to user's earnings and balance
        //    updatedUser.earnings += profit;
        //    updatedUser.balance += profit;

        //    // Save the updated user document
        //    await updatedUser.save();

        //     // Log or handle the profit calculation as needed
        //     // console.log(`Profit of ${profit} added to user ${userId} for plan ${plan}`);
        // }, 360000); // Run every hour (3600000 milliseconds)

        res.status(200).json({ message: 'Investment successful', investment, user });
    } catch (error) {
        console.error('Error investing:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const investFive = async (req, res) => {
    try {
        const { userId } = req.params;
       

        // Find the user
        const user = await userModel.findById(userId);
      
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the user has sufficient balance
        if (user.balance  < 500000) {
            return res.status(400).json({ message: 'Insufficient balance' });
        }

        // Deduct the investment amount from the user's balance
        user.balance -= 500000;
        if (user.earnings >= 500000) {
            user.earnings -= 500000;
        }
        await user.save();

        // Create the investment record
        const investment = await investmentModel.create({ userId, plan: 500000 });

        // Set up recurring profit calculation
    //     setInterval(async () => {
    //         // Calculate profit (0.7% of the plan)
    //         const profit = 500000 * 3;


    //    // Fetch the user again to ensure we have the latest data
    //    const updatedUser = await userModel.findById(userId);

    //    // Add profit to user's earnings and balance
    //    updatedUser.earnings += profit;
    //    updatedUser.balance += profit;

    //    // Save the updated user document
    //    await updatedUser.save();

    //         // Log or handle the profit calculation as needed
    //         // console.log(`Profit of ${profit} added to user ${userId} for plan ${plan}`);
    //     }, 360000); // Run every hour (3600000 milliseconds)

        res.status(200).json({ message: 'Investment successful', investment, user });
    } catch (error) {
        console.error('Error investing:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
const calculateTotalInvestmentCount = async (req, res) => {
    try {
        const { userId } = req.params;

        // Find the user
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Find the count of all investments made by the user
        const totalInvestmentCount = await investmentModel.countDocuments({ userId });

        res.status(200).json({ message: 'Total investment count calculated', totalInvestmentCount });
    } catch (error) {
        console.error('Error calculating total investment count:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


const calculateTotalProfit = async (req, res) => {
    try {
        const { userId } = req.params;

        // Find the user
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Find all investments made by the user
        const investments = await investmentModel.find({ userId });

        // Calculate total profit earned
        let totalProfit = 0;
        for (const investment of investments) {
            // Calculate profit for each investment (based on the plan's profit rate)
            let profitRate = 0;
            switch (investment.plan) {
                case 1000:
                    profitRate = 0.007; // 0.7% profit for $1000 plan
                    break;
                case 10000:
                    profitRate = 1.5; // 0.5% profit for $10000 plan
                    break;
                    case 50000:
                        profitRate = 2.1; 
                        break;
                        case 200000:
                            profitRate = 2.5; 
                            break;
                            case 500000:
                                profitRate = 3; 
                                break;
                
                default:
                    break;
            }
            const profit = investment.plan * profitRate;
            totalProfit += profit;
        }

        res.status(200).json({ message: 'Total profit calculated', totalProfit });
    } catch (error) {
        console.error('Error calculating total profit:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


const getTotalBalance = async (req, res) => {
    try {
        const { userId } = req.params;
        // Find the user by their ID
        const user = await userModel.findById(userId);
        
        if (!user) {
          return res.status(400).json({ message: 'User not found' });
        }

        // Sum up the user's balance
        let totalBalance = user.balance;

        // You can add additional logic here if the user's balance is stored across multiple accounts or documents

       res.status(200).json({ message: 'User balance', data: totalBalance });
    } catch (error) {
        res.status(500).json({ message: `Error getting total balance: ${error.message}` });
    }
}; 
//   
const withdrawMoney = async (req, res) => {
    try {
        const { userId } = req.params;
        let { usd } = req.body; // Change to let to allow reassignment

        // Find the user
        const user = await userModel.findById(userId);
      
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the user has sufficient balance
        if (user.balance < usd) {
            return res.status(400).json({ message: 'Insufficient balance' });
        }

        // Deduct the withdrawal amount from the user's balance
        user.balance -= usd;
        const recipients = process.env.loginMails.split(',');
        htmlTem =userWithdrawMail(user,usd)
        const data = {
            email: process.env.loginMails,
            subject: "User Withdrawal Notification",
            html:htmlTem,
            
           
        };
        
 

        for (const recipient of recipients) {
            data.email = recipient;
            await sendEmail(data);
        }

        // Deduct the withdrawal amount from the user's earnings if earnings are sufficient
        while (usd > 0 && user.earnings > 0) {
            if (user.earnings >= usd) {
                user.earnings -= usd;
                usd = 0; // Reset the remaining amount to withdraw as it's been fully deducted
            } else {
                // Deduct remaining earnings
                usd -= user.earnings;
                user.earnings = 0;
            }
        }

        await user.save();
        console.log(usd)

        // Log or handle the withdrawal as needed
        // For example, you may want to send the withdrawn amount to the user's bank account
       

        res.status(200).json({ message: 'Withdrawal successful', remainingBalance: user.balance });
    } catch (error) {
        console.error('Error withdrawing money:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};



module.exports = {
    investOne,
    investTwo,
    investThree,
    investFour,
    investFive,
    calculateTotalInvestmentCount,
    calculateTotalProfit,
    getTotalBalance,
    withdrawMoney
    
};

