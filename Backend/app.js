const express = require('express')
const connetDB = require('./config/db')
const user = require('./routes/user')
const Recipe = require('./routes/Recipe')
require('dotenv').config()
const cors = require('cors')


const app = express()
connetDB()

app.use(cors())


app.use('/auth',user)

app.use('/food', Recipe)

app.get("/", (req,res) =>{
    res.send("Welcome to Recipe Website")
})

app.listen(process.env.PORT , () => {
    console.log(`Server running on port ${process.env.PORT}`)
})