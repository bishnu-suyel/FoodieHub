import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Recipes from './components/Recipes'; // Ensure the path is correct
import RecipeDetail from './components/RecipeDetail'; // Ensure the path is correct

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Recipes />} />
        <Route path="/recipes/:documentId" element={<RecipeDetail />} /> {/* Updated path */}
      </Routes>
    </Router>
  );
};

export default App;