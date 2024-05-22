import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';

function Recipe() {
  const [recipes, setRecipes] = useState([]);
  const [showRecipeModal, setShowRecipeModal] = useState(false);
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const [recipeFormData, setRecipeFormData] = useState({
    title: '', 
    ingredients: '', 
    instructions: '', 
    video: '', 
    description: '', 
    category: '',
    poster: ''
  });

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get('http://localhost:3001/food');
      setRecipes(response.data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  const handleShowRecipe = (recipe) => {
    if (recipe) {
      setCurrentRecipe(recipe);
      setRecipeFormData({
        title: recipe.title,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
        video: recipe.video,
        description: recipe.description,
        category: recipe.category,
        poster: recipe.poster
      });
    } else {
      setCurrentRecipe(null);
      setRecipeFormData({
        title: '', 
        ingredients: '', 
        instructions: '', 
        video: '', 
        description: '', 
        category: '',
        poster: ''
      });
    }
    setShowRecipeModal(true);
  };

  const handleCloseRecipe = () => {
    setShowRecipeModal(false);
    setCurrentRecipe(null);
  };

  const handleRecipeChange = (e) => {
    const { name, value } = e.target;
    setRecipeFormData({ ...recipeFormData, [name]: value });
  };

  const handleSaveRecipe = async () => {
    if (currentRecipe) {
      // Update existing recipe
      try {
        await axios.put(`http://localhost:3001/food/recipes/${currentRecipe._id}`, recipeFormData);
        fetchRecipes();
        handleCloseRecipe();
      } catch (error) {
        console.error('Error updating recipe:', error);
      }
    } else {
      // Create new recipe
      try {
        await axios.post('http://localhost:3001/food/recipes', recipeFormData);
        fetchRecipes();
        handleCloseRecipe();
      } catch (error) {
        console.error('Error creating recipe:', error);
      }
    }
  };

  const deleteRecipe = async (_id) => {
    try {
      await axios.delete(`http://localhost:3001/food/recipes/${_id}`);
      fetchRecipes();
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  return (
    <div className="container">
      <h1>Recipe Management</h1>
      <button className="btn btn-success mb-2" onClick={() => handleShowRecipe(null)}>Add New Recipe</button>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Poster</th>
            <th>Ingredients</th>
            <th>Instructions</th>
            <th>Category</th>
            <th>Video</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {recipes.map(recipe => (
            <tr key={recipe._id}>
              <td>{recipe._id}</td>
              <td>{recipe.title}</td>
              <td><img src={recipe.poster} alt="posterimg" width={100} /></td>
              <td>{recipe.ingredients}</td>
              <td>{recipe.instructions}</td>
              <td>{recipe.category}</td>
              <td>{recipe.video}</td>
              <td>
                <button className="btn btn-primary mr-2" onClick={() => handleShowRecipe(recipe)}>Edit</button>
                <button className="btn btn-danger" onClick={() => deleteRecipe(recipe._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={showRecipeModal} onHide={handleCloseRecipe}>
        <Modal.Header closeButton>
          <Modal.Title>{currentRecipe ? 'Edit Recipe' : 'Add Recipe'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={recipeFormData.title}
                onChange={handleRecipeChange}
              />
            </Form.Group>
            <Form.Group controlId="formPoster">
              <Form.Label>Poster</Form.Label>
              <Form.Control
                type="text"
                name="poster"
                value={recipeFormData.poster}
                onChange={handleRecipeChange}
              />
            </Form.Group>
            <Form.Group controlId="formIngredients">
              <Form.Label>Ingredients</Form.Label>
              <Form.Control
                type="text"
                name="ingredients"
                value={recipeFormData.ingredients}
                onChange={handleRecipeChange}
              />
            </Form.Group>
            <Form.Group controlId="formInstructions">
              <Form.Label>Instructions</Form.Label>
              <Form.Control
                type="text"
                name="instructions"
                value={recipeFormData.instructions}
                onChange={handleRecipeChange}
              />
            </Form.Group>
            <Form.Group controlId="formCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                name="category"
                value={recipeFormData.category}
                onChange={handleRecipeChange}
              />
            </Form.Group>
            <Form.Group controlId="formVideo">
              <Form.Label>Video</Form.Label>
              <Form.Control
                type="text"
                name="video"
                value={recipeFormData.video}
                onChange={handleRecipeChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseRecipe}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveRecipe}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Recipe;
