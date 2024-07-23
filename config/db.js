const mongoose = require('mongoose')
require('dotenv').config()

const link = process.env.url

mongoose.connect(link).then(
    ()=>{
        console.log('connected to database successfully')
    }
).catch((error)=>{
    console.log(error.message)
})