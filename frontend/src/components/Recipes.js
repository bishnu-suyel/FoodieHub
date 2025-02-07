import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);

  // Fetching the recipe data from Strapi API
  const fetchRecipes = async () => {
    try {
      const response = await axios.get('http://localhost:1337/api/receipes');
      setRecipes(response.data.data);  // Assuming 'data' is the array containing the recipes
    } catch (error) {
      setError('Error fetching recipes');
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <div>
      {error && <p>{error}</p>}
      {recipes.length > 0 ? (
        recipes.map((recipe, index) => (
          <div key={index}>
            <h2>{recipe.Title}</h2>
            <h3>Description:</h3>
            <p>{recipe.Description[0]?.children[0]?.text}</p> {/* Render description text */}
            
            <h3>Ingredients:</h3>
            <ul>
              {recipe.Ingredients.map((ingredient, index) => (
                <li key={index}>
                  {ingredient.children && ingredient.children[0] ? ingredient.children[0].text : ''}
                </li> 
              ))}
            </ul>
            
            <h3>Instructions:</h3>
            <ol>
              {recipe.Instructions.map((instruction, index) => (
                <li key={index}>
                  {instruction.children && instruction.children[0] ? instruction.children[0].text : ''}
                </li>
              ))}
            </ol>
            
            <p>Cooking Time: {recipe.Cooking_Time} minutes</p>
          </div>
        ))
      ) : (
        <p>Loading recipes...</p>
      )}
    </div>
  );
};

export default Recipes;