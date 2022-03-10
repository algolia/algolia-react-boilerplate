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
import { Main } from './Main.jsx';

const App = () => {
  console.log(searchClient);
  const search = algoliasearch(searchClient.appID, searchClient.APIKey);
  return (
    <RecoilRoot>
      <InstantSearch searchClient={search} indexName={indexName.index}>
        <CustomStateResults />
        <Router>
          <Main />
        </Router>
      </InstantSearch>
    </RecoilRoot>
  );
};

export default App;
