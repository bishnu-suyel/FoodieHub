import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';
import 'bootstrap/dist/css/bootstrap.min.css';

const RecipeDetail = () => {
  const { documentId } = useParams(); 
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchRecipe = async () => {
    if (!documentId) {
      setError('Invalid document ID');
      setLoading(false);
      return;
    }

    try {
      const response = await api.get(`/receipes?filters[documentId][$eq]=${documentId}&populate=*`);
      if (!response.data.data || response.data.data.length === 0) {
        throw new Error('Recipe not found');
      }
      setRecipe(response.data.data[0]);
      setError(null);
    } catch (error) {
      setError('Recipe not found or error fetching recipe');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipe();
  }, [documentId]);

  if (loading) {
    return <p className="text-center">Loading recipe...</p>;
  }

  if (error) {
    return <p className="text-center text-danger">{error}</p>;
  }

  return (
    <div className="container mt-4">
      <button
        className="btn btn-primary position-fixed top-0 end-0 m-3"
        style={{ zIndex: 1050 }}
        onClick={() => navigate(-1)}
      >
        Back
      </button>
      
      <h2 className="card-title text-center mt-5">{recipe.Title || 'No Title'}</h2>
      {recipe ? (
        <div className="card mb-4 shadow-sm">
          <div className="card-body text-center">
            {recipe.Image && recipe.Image.length > 0 && (
              <img
                src={`http://localhost:1337${recipe.Image[0].url}`}
                alt={recipe.Title || 'No Title'}
                className="img-fluid rounded mb-3"
                style={{ maxWidth: "400px", height: "auto" }}
              />
            )}

            <h3 className="mt-3">Description</h3>
            <p className="text-muted">{recipe.Description[0]?.children[0]?.text || 'No Description'}</p>

            <h3 className="mt-3">Ingredients</h3>
            <div className="d-flex justify-content-center flex-wrap">
              {recipe.Ingredients.map((ingredient, index) => (
                <span key={index} className="badge bg-secondary m-1 p-2">
                  {ingredient.children?.[0]?.text || ''}
                </span>
              ))}
            </div>

            <h3 className="mt-3">Instructions</h3>
            <ol className="text-start mx-auto" style={{ maxWidth: "600px" }}>
              {recipe.Instructions.map((instruction, index) => (
                <li key={index} className="mb-2">
                  {instruction.children?.[0]?.text || ''}
                </li>
              ))}
            </ol>

            <p className="fw-bold mt-3">Cooking Time: {recipe.Cooking_Time || 'N/A'} minutes</p>
          </div>
        </div>
      ) : (
        <p className="text-center">Recipe not found</p>
      )}
    </div>
  );
};

export default RecipeDetail;
