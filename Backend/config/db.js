const mongoose = require('mongoose')

const connetDB =() => {
    mongoose.connect("mongodb://127.0.0.1:27017/Recipe")

    mongoose.connection.on('connected',() => {
        console.log("----monogodb server conneted with backend----");
    })
}


module.exports = connetDB