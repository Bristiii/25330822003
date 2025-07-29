import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import StatsPage from './components/StatsPage';
import RedirectHandler from './components/RedirectHandler';
import Navigation from './components/Navigation';
import DevTools from './components/DevTools';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/stats" element={<StatsPage />} />
          <Route path="/:shortCode" element={<RedirectHandler />} />
        </Routes>
        <DevTools />
      </div>
    </Router>
  );
}

export default App;
