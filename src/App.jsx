import algoliasearch from 'algoliasearch/lite';
import React from 'react';
// Algolia import
import { InstantSearch } from 'react-instantsearch-dom';
// React router
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// RecoilState Management
// https://recoiljs.org/docs/introduction/getting-started
import { RecoilRoot } from 'recoil';

// Import Pages
import Header from './components/header/Header';
import HomePage from './pages/HomePage';
import Page2 from './pages/Page2';

// SCSS import
import './scss/index.scss';

// application state from config file
// eslint-disable-next-line import/order
import { indexName, searchClient } from './config/config';

// Import Components

const App = () => {
  const search = algoliasearch(searchClient.appID, searchClient.APIKey);
  return (
    <RecoilRoot>
      <InstantSearch searchClient={search} indexName={indexName.index}>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/page2" element={<Page2 />} />
          </Routes>
        </Router>
      </InstantSearch>
    </RecoilRoot>
  );
};

export default App;
