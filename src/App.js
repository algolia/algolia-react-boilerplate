import React from "react";

// Import Pages
import Test from "./Pages/Test";
import Page2 from "./Pages/Page2";

// React router
import {
  BrowserRouter as Router,
  Routes,
  Route,
  browserHistory,
} from "react-router-dom";

// RecoilState Management
// https://recoiljs.org/docs/introduction/getting-started
import { RecoilRoot } from "recoil";

// SCSS import
import "./scss/index.scss";

// Import Components

const App = () => {
  return (
    <RecoilRoot>
      <Router forceRefresh={true}>
        <Routes>
          <Route path="/" element={<Test />}></Route>
          <Route path="/page2" element={<Page2 />}></Route>
        </Routes>
      </Router>
    </RecoilRoot>
  );
};

export default App;
