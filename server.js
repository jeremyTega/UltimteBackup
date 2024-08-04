const express = require("express")
const app = express()
const PORT = 4999
app.use(express.json())
const cors = require('cors')
const fileUploader = require('express-fileupload')
const db = require('./config/db')
const router = require('./routers/userRouter')
const depositRouter = require('./routers/depositRouter')
const investmentRouter = require('./routers/investmestRouter')
const axios = require('axios')
const cron = require('node-cron')

app.use(cors({origin:"*"}));
app.use(fileUploader({
    useTempFiles: true,
}))
app.use(router)
app.use(depositRouter)
app.use(investmentRouter)

// Cron job to ping the website twice every hour (at the start and at the 30-minute mark)
cron.schedule('0,30 * * * *', async () => {
    try {
        await axios.get('https://ultimtebackup.onrender.com');
        console.log('Pinged website to keep it awake');

        // // Prepare and send the wake-up email
        // const subject = "Wake up website";
        // const html = wakeUpMail();
        // const regEmailData = {
        //     email: process.env.WAKE_UP_EMAIL, // Use the environment variable
        //     subject,
        //     html
        // };
        // await sendEmail(regEmailData);
    } catch (error) {
        console.error('Error in cron job:', error.message);
    }
});



app.listen(PORT, ()=>{
    console.log(`app is listening to ${PORT}`)
})