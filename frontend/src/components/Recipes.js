import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import api from '../api'; 

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchRecipes = async () => {
    try {
      const response = await api.get('/receipes?populate=*');
      setRecipes(response.data.data);
    } catch (error) {
      setError('Error fetching recipes');
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  // Filter recipes based on search query
  const filteredRecipes = recipes.filter((recipe) =>
    recipe.Title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <div className="mb-4 d-flex justify-content-center">
        <input
          type="text"
          className="form-control w-50"
          placeholder="Search recipes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      {error && <p className="text-danger">{error}</p>}
      {filteredRecipes.length > 0 ? (
        filteredRecipes.map((recipe) => (
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
        <p>No recipes found</p>
      )}
    </div>
  );
};

export default Recipes;