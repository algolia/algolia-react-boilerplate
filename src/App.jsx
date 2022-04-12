import { useState, useEffect } from 'react';

import { InstantSearch } from 'react-instantsearch-dom';

// React router
import { BrowserRouter as Router } from 'react-router-dom';

// Recoil State Management
import { RecoilRoot, useRecoilValue } from 'recoil';

// SCSS import
import './scss/index.scss';

// application state from config file
import { searchClient, indexNames } from './config/algoliaEnvConfig';

// Import Components
import Loader from '@/components/loader/Loader';
import { Main } from './Main.jsx';

// Allows logging and manipulation of algolia results etc.
import CustomStateResults from './components/stateResults/stateResults';

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [language, setLanguage] = useState('');
  useEffect(() => {
    console.log('toto', language);
    setTimeout(() => {
      setIsLoaded(true);
    }, 3000);
  }, [language]);

  return (
    <RecoilRoot>
      <InstantSearch
        searchClient={searchClient}
        indexName={indexNames.mainIndex}
      >
        <CustomStateResults />
        <Router>
          {isLoaded === false && <Loader isLoaded={isLoaded} />}
          <Main
            isLoaded={isLoaded}
            setIsLoaded={setIsLoaded}
            setLanguage={setLanguage}
          />
        </Router>
      </InstantSearch>
    </RecoilRoot>
  );
};

export default App;
