require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const PORT = process.env.PORT
const DB_URI = process.env.DB_URI
const router = require('./router')

mongoose.connect(DB_URI, { useNewUrlParser: true }).
    then(() => {
        const app = express()
        app.use(express.json())
        app.use(express.urlencoded({extended:true}))

        app.use('/api', router)

        app.listen(PORT, () => {
            console.log(`Listening to ${PORT}`)
        })
    }).
    catch((err) => {
        console.log("DB Error: " + err)
    }) 
