// Algolia related imports
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch } from 'react-instantsearch-dom';

// React router
import { BrowserRouter as Router } from 'react-router-dom';

// Recoil State Management
import { RecoilRoot } from 'recoil';

// SCSS import
import './scss/index.scss';

// application state from config file
// eslint-disable-next-line import/order
import { searchClient, indexName } from './config/config';

// Import Components
import { Main } from './Main.jsx';

// Allows logging and manipulation of algolia results etc.
import CustomStateResults from './components/stateResults/stateResults';

const App = () => {

  // instantiate the algolia API client
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
