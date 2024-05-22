const mongoose = require('mongoose')
const RecipeSchema = new mongoose.Schema({
    video:{
        type:String,
    },
    title:{
        type:String,
        required:true
    },
    ingredients:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },

    poster:{
        type:String,
        required:true
    },

    instructions : {
        type:String,
        require:true

    }

})

module.exports = mongoose.model("Recipe", RecipeSchema)