// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PortfolioPreview from './pages/PortfolioPreview';
import ViewPortfolio from './pages/ViewPortfolio';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/preview" element={<PortfolioPreview />} />
        <Route path="/portfolio/:username" element={<PortfolioPreview />} />
      </Routes>
    </Router>
  );
}

export default App;