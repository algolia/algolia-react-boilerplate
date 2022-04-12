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
  // Get state from main.jsx (inside recoil instance) in order to check in switch statement language value...
  // ...and choose the right index from config
  const [language, setLanguage] = useState('');
  // Create a state by default for english language (main index)
  // Use value from switch statement in IS instance
  const [indexLanguage, setIndexLanguage] = useState(indexNames.mainIndex);
  useEffect(() => {
    // Allow to set the indexLanguage to the language choose in the selector through Recoil
    switch (language) {
      case 'English':
        setIndexLanguage(indexNames.mainIndex);
        break;
      case 'Spanish':
        setIndexLanguage(indexNames.mainIndex_spanish);
        break;
      case 'French':
        setIndexLanguage(indexNames.mainIndex_french);
        break;
      case 'German':
        setIndexLanguage(indexNames.mainIndex_german);
        break;
    }
    setTimeout(() => {
      setIsLoaded(true);
    }, 3000);
  }, [setIndexLanguage, indexLanguage, language]);

  return (
    <RecoilRoot>
      <InstantSearch searchClient={searchClient} indexName={indexLanguage}>
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
