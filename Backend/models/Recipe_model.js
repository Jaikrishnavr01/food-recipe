const mongoose = require('mongoose')
const RecipeSchema = new mongoose.Schema({
    video:{
        type:String,
    },
    title:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    description: {
        type:String,
        require:true

    }

})

module.exports = mongoose.model("Recipe", RecipeSchema)