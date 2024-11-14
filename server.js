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
    let retries = 3;
    let delay = 5000; // 5 seconds
  
    for (let i = 0; i < retries; i++) {
      try {
        await axios.get('https://citadelbackup.onrender.com');
        console.log('Pinged website to keep it awake');
        return;
      } catch (error) {
        console.error(`Error in cron job (attempt ${i + 1}):`, error.message);
        console.error('Error stack:', error.stack);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  
    console.error('Failed to ping website after', retries, 'attempts');
  });




app.listen(PORT, ()=>{
    console.log(`app is listening to ${PORT}`)
})