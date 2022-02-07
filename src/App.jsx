import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

// Import Pages
import HomePage from './pages/HomePage';
import Page2 from './pages/Page2';

// React router

// RecoilState Management
// https://recoiljs.org/docs/introduction/getting-started

// SCSS import
import './scss/index.scss';

// Import Components

const App = () => {
  return (
    <RecoilRoot>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/page2" element={<Page2 />} />
        </Routes>
      </Router>
    </RecoilRoot>
  );
};

export default App;
