import './App.css';
import Recipes from './components/Recipes'; // Ensure the component name is correct
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Recipes />} />
        <Route path="/recipes" element={<Recipes />} /> {/* Corrected from "/receipes" to "/recipes" */}
      </Routes>
    </Router>
  );
};

export default App;
