import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Components/Navbar/Navbar';
import Carousel from '../Components/Carousel/Carousel';
import Footer from '../Components/Footer/Footer';

export default function Home() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await fetch('http://localhost:3001/food');
      if (!response.ok) {
        throw new Error('Failed to fetch recipes');
      }
      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <Carousel />
      <div className="container">
        <div className="row">
          {recipes.map(recipe => (
            <div className="col-md-4 mb-4" key={recipe.id}>
              <RecipeCard recipe={recipe} />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

// Recipe card component
function RecipeCard({ recipe }) {
  return (
    <div style={{marginTop:'20px'}}>

    
    <div className="card" style={{width:'200px', paddingTop:"20px"}}>
      <div className="card-body">
      <h5 className="card-title" >{recipe.title}</h5>
        <h5 className="card-body"><img src={recipe.poster} width='100%' /></h5>
        <p className="card-text">{recipe.description}</p>
        <Link to={`/recipe/${recipe._id}`} className="btn btn-primary">View Recipe</Link>
      </div>
    </div>
    </div>
  );
}
