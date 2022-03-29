import { useState, useEffect } from 'react';

// Algolia import
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch } from 'react-instantsearch-dom';

// React router
import { BrowserRouter as Router } from 'react-router-dom';

// Recoil State Management
import { RecoilRoot } from 'recoil';

// SCSS import
import './scss/index.scss';

// application state from config file
import { searchClient, indexName } from './config/appConfig';

// Import Components
import Loader from './components/loader/Loader';
import { Main } from './Main.jsx';

// Allows logging and manipulation of algolia results etc.
import CustomStateResults from './components/stateResults/stateResults';

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
          {isLoaded === false && <Loader isLoaded={isLoaded} />}
          <Main isLoaded={isLoaded} setIsLoaded={setIsLoaded} />
        </Router>
      </InstantSearch>
    </RecoilRoot>
  );
};

export default App;
