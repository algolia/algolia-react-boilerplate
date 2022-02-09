import React from "react";

// Algolia import
import algoliasearch from "algoliasearch/lite";
import { InstantSearch } from "react-instantsearch-dom";

// Import Pages
import Test from "./pages/Test";
import Page2 from "./pages/Page2";

// React router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// RecoilState Management
// https://recoiljs.org/docs/introduction/getting-started
import { RecoilRoot } from "recoil";

// SCSS import
import "./scss/index.scss";

// application state from config file
import { indexName, searchClient } from "./config/config";

// Import Components

const App = () => {
  const search = algoliasearch(searchClient.appID, searchClient.APIKey);
  return (
    <RecoilRoot>
      <InstantSearch searchClient={search} indexName={indexName.index}>
        <Router>
          <Routes>
            <Route path="/" element={<Test />}></Route>
            <Route path="/page2" element={<Page2 />}></Route>
          </Routes>
        </Router>
      </InstantSearch>
    </RecoilRoot>
  );
};

export default App;
