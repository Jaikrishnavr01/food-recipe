import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';

function RecipePage() {
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/food')
      .then(response => {
        setRecipe(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the recipe data!', error);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        {recipe ? (
          <div className="row">
            <div className="col-md-8">
              <h1>{recipe.name}</h1>
              <p>{recipe.description}</p>
              <video width="100%" controls>
                <source src={recipe.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="col-md-4">
              <h3>Ingredients</h3>
              <ul>
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
              <h3>Instructions</h3>
              <p>{recipe.instructions}</p>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default RecipePage;
