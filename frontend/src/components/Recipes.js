import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const Recipes = () => {
  const [receipes, setReceipes] = useState([]);
  const [error, setError] = useState(null);

  // Fetching the receipe data from Strapi API (with images)
  const fetchReceipes = async () => {
    try {
      const response = await axios.get('http://localhost:1337/api/receipes?populate=*');
      setReceipes(response.data.data); 
    } catch (error) {
      setError('Error fetching recipes');
      console.error(error);
    }
  };

  useEffect(() => {
    fetchReceipes();
  }, []);

  return (
    <div className="container mt-4">
      {error && <div className="alert alert-danger">{error}</div>}
      {receipes.length > 0 ? (
        receipes.map((recipe, index) => (
          <div key={index} className="card mb-4 shadow-sm">
            <div className="card-body text-center">
              <h2 className="card-title">{recipe.Title}</h2>

              {/* Display Image */}
              {recipe.Image && recipe.Image.length > 0 && (
                <img
                  src={`http://localhost:1337${recipe.Image[0].url}`}
                  alt={recipe.Title}
                  className="img-fluid rounded mb-3"
                  style={{ maxWidth: "400px", height: "auto" }}
                />
              )}

              <h3 className="mt-3">Description</h3>
              <p className="text-muted">{recipe.Description[0]?.children[0]?.text}</p> 

              <h3 className="mt-3">Ingredients</h3>
              <div className="d-flex justify-content-center flex-wrap">
                {recipe.Ingredients.map((ingredient, index) => (
                  <span key={index} className="badge bg-secondary m-1 p-2">
                    {ingredient.children && ingredient.children[0] ? ingredient.children[0].text : ''}
                  </span>
                ))}
              </div>

              <h3 className="mt-3">Instructions</h3>
              <ol className="text-start mx-auto" style={{ maxWidth: "600px" }}>
                {recipe.Instructions.map((instruction, index) => (
                  <li key={index} className="mb-2">
                    {instruction.children && instruction.children[0] ? instruction.children[0].text : ''}
                  </li>
                ))}
              </ol>

              <p className="fw-bold mt-3">Cooking Time: {recipe.Cooking_Time} minutes</p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center">Loading receipes...</p>
      )}
    </div>
  );
};

export default Recipes;
