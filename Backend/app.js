const express = require('express')
const connetDB = require('./config/db')
const user = require('./routes/user')
require('dotenv').config()

const app = express()
connetDB()


app.use('/auth',user)

app.get("/", (req,res) =>{
    res.send("Welcome to Recipe Website")
})

app.listen(process.env.PORT , () => {
    console.log(`Server running on port ${process.env.PORT}`)
})