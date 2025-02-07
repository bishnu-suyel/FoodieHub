import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import axios from 'axios';

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get('http://localhost:1337/api/receipes?populate=*');
      setRecipes(response.data.data);
    } catch (error) {
      setError('Error fetching recipes');
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <div className="container">
      {error && <p className="text-danger">{error}</p>}
      {recipes.length > 0 ? (
        recipes.map((recipe) => (
          <div key={recipe.id} className="card my-3">
            <div className="card-body">
              <h2 className="card-title">{recipe.Title}</h2>
              <p className="card-text">{recipe.Description[0]?.children[0]?.text}</p>
              <Link to={`/recipes/${recipe.documentId}`} className="btn btn-primary">
                View Recipe
              </Link>
            </div>
          </div>
        ))
      ) : (
        <p>Loading recipes...</p>
      )}
    </div>
  );
};

export default Recipes;