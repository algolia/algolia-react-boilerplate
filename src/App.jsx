import React from "react";

// Import Pages

import HomePage from "./pages/HomePage";
import Page2 from "./pages/Page2";

// React router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// RecoilState Management
// https://recoiljs.org/docs/introduction/getting-started
import { RecoilRoot } from "recoil";

// SCSS import
import "./scss/index.scss";

// Import Components

const App = () => {
  return (
    <RecoilRoot>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/page2" element={<Page2 />}></Route>
        </Routes>
      </Router>
    </RecoilRoot>
  );
};

export default App;
