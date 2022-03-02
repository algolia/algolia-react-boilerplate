// Algolia import
import algoliasearch from 'algoliasearch/lite';
import React from 'react';
import { InstantSearch } from 'react-instantsearch-dom';
// React router
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// RecoilState Management
// https://recoiljs.org/docs/introduction/getting-started
import { RecoilRoot } from 'recoil';

// Import Pages

import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import CustomStateResults from './components/stateResults/stateResults';
import HomePage from './pages/HomePage';
import ProductDetails from './pages/ProductDetails';
import ResultsPage from './pages/ResultsPage';
// eslint-disable-next-line import/order
import SearchResultsPage from './pages/SearchResultsPage';

// SCSS import
import './scss/index.scss';

// application state from config file
// eslint-disable-next-line import/order
import { searchClient, indexName } from './config/config';

// Import Components

const App = () => {
  const search = algoliasearch(searchClient.appID, searchClient.APIKey);
  // import index name as Atom

  return (
    <RecoilRoot>
      <InstantSearch searchClient={search} indexName={indexName.index}>
        <CustomStateResults />
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchResultsPage />} />
            <Route path="/search/:objectID" element={<ProductDetails />} />
            <Route path="/results" element={<ResultsPage />} />
          </Routes>
          <Footer />
        </Router>
      </InstantSearch>
    </RecoilRoot>
  );
};

export default App;
