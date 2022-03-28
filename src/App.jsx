import { useState, useEffect } from 'react';
// Algolia import
import algoliasearch from 'algoliasearch/lite';
import React from 'react';
import { InstantSearch } from 'react-instantsearch-dom';
// React router
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// RecoilState Management
// https://recoiljs.org/docs/introduction/getting-started
import { RecoilRoot } from 'recoil';

import CustomStateResults from './components/stateResults/stateResults';

// SCSS import
import './scss/index.scss';

// application state from config file
import { searchClient, indexName } from './config/appConfig';

// Import Components
import Loader from './components/loader/Loader';
import { Main } from './Main.jsx';

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const search = algoliasearch(searchClient.appID, searchClient.APIKey);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 3000);
  }, []);

  return (
    <RecoilRoot>
      <InstantSearch searchClient={search} indexName={indexName.index}>
        <CustomStateResults />
        <Router>
          {isLoaded ? <Main setIsLoaded={setIsLoaded} /> : <Loader />}
        </Router>
      </InstantSearch>
    </RecoilRoot>
  );
};

export default App;
