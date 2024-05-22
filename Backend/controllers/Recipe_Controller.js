const Recipe_model = require("../models/Recipe_model");

exports.create = async (req, res) => {
    const { video, ingredients, instructions, category, title, poster} = req.body;
    const newRecipe = new Recipe_model({
        video,
        instructions,
        category,
        title,
        poster,
        ingredients,
    });

    const savedRecipe = await newRecipe.save();
    res.status(201).json(savedRecipe);
};

exports.getAll = async (req, res) => {
    try {
        const recipes = await Recipe_model.find();
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.getById = async (req, res) => {
    const recipe = await Recipe_model.findById(req.params.id);
    if (!recipe) {
        return res.status(404).json({ message: "Recipe not found" });
    }
    res.status(200).json(recipe);
};

exports.updateById = async (req, res) => {
    const { video, ingredients,instructions, category, title , poster } = req.body;
    const updatedRecipe = await Recipe_model.findByIdAndUpdate(
        req.params.id,
        { video, category,instructions ,ingredients, poster,title },
        { new: true }
    );
    if (!updatedRecipe) {
        return res.status(404).json({ message: "Recipe not found" });
    }
    res.status(200).json(updatedRecipe);
};

exports.deleteById = async (req, res) => {
    const deletedRecipe = await Recipe_model.findByIdAndDelete(req.params.id);
    if (!deletedRecipe) {
        return res.status(404).json({ message: "Recipe not found" });
    }
    res.status(200).json({ message: "Recipe deleted successfully" });
};
