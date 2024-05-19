const Recipe_model = require("../models/Recipe_model");

exports.create = async (req, res) => {
    const { video, description, category, title } = req.body;
    const newRecipe = new Recipe_model({
        video,
        description,
        category,
        title
    });

    const savedRecipe = await newRecipe.save();
    res.status(201).json(savedRecipe);
};

exports.getById = async (req, res) => {
    const recipe = await Recipe_model.findById(req.params.id);
    if (!recipe) {
        return res.status(404).json({ message: "Recipe not found" });
    }
    res.status(200).json(recipe);
};

exports.updateById = async (req, res) => {
    const { video, description, category, title } = req.body;
    const updatedRecipe = await Recipe_model.findByIdAndUpdate(
        req.params.id,
        { video, description, category, title },
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
