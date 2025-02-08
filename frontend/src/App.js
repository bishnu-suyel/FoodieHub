import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Recipes from './components/Recipes'; 
import RecipeDetail from './components/RecipeDetail'; 

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Recipes />} />
        <Route path="/recipes/:documentId" element={<RecipeDetail />} /> 
      </Routes>
    </Router>
  );
};

export default App;