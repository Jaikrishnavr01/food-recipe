import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';
import ReactPlayer from 'react-player';

function RecipePage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3001/food/recipes/${id}`)
      .then(response => {
        setRecipe(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the recipe data!', error);
      });
  }, [id]);

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        {recipe ? (
          <div className="row">
            <div className="col-md-8">
              <div style={{paddingBottom:'10px'}}>
              <ReactPlayer url={recipe.video} controls={true} width="100%"  muted={false} />
              </div>
            </div>
            <div className="col-md-4">
            <h1>{recipe.title}</h1>
              <h3>Ingredients</h3>
              <p>{recipe.ingredients}</p>
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
