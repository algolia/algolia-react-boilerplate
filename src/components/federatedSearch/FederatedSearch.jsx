import { useRef, memo } from 'react';

// Algolias's import
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, Configure, Index } from 'react-instantsearch-dom';

// framer motion
import { motion } from 'framer-motion';
import { framerMotionFederatedContainer } from '../../config/config';

// import from Recoil
import { useSetRecoilState, useRecoilValue } from 'recoil';

// Config
import { indexName, searchClient } from '../../config/appConfig';

// Those imports are here to check if user is clicking outside the searchbox & federated to close federated
import { isFederatedAtom, searchBoxAtom } from '../../config/config';

// Show or unshow sections in federated (product, suggestions, categories, articles, recent searches)
// categories import is here to choose which attribute you want to show as category
import {
  federatedSearchConfig,
  categories,
} from '../../config/federatedConfig';

// Sharing query to general state
import { queryAtom } from '../../config/searchbox';

// Import Persona State from recoil
import { personaSelectedAtom } from '../../config/header';

// hook import
// Check if user is clecking outside an element
import useOutsideClickConditional from '../../hooks/useOutsideClickConditional';
// Check screensize for responsiveness
import useScreenSize from '../../hooks/useScreenSize';

// Components imports
import RecentSearches from './components/RecentSearches';
import QuerySuggestions from './components/QuerySuggestions';
import Category from './components/Category';
import Products from './components/Products';
import Articles from './components/BlogPost';

const FederatedSearch = () => {
  // Recoil & States
  const personaSelect = useRecoilValue(personaSelectedAtom);
  const setIsFederated = useSetRecoilState(isFederatedAtom);
  const searchboxRef = useRecoilValue(searchBoxAtom);
  const query = useRecoilValue(queryAtom);

  const containerFederated = useRef('');
  // Custom hook
  useOutsideClickConditional(containerFederated, searchboxRef, () =>
    setIsFederated(false)
  );
  const { mobile, tablet } = useScreenSize();

  // Federated search configuration
  const {
    isRecentSearch,
    isQuerySuggestions,
    isCategory,
    isBlogPosts,
    isProduct,
  } = federatedSearchConfig;

  // Algolia searchclient
  const search = algoliasearch(searchClient.appID, searchClient.APIKey);

  return (
    <motion.div
      className="federatedSearch"
      ref={containerFederated}
      variants={framerMotionFederatedContainer}
      initial={framerMotionFederatedContainer.initial}
      animate={framerMotionFederatedContainer.animate}
      exit={framerMotionFederatedContainer.exit}
      transition={framerMotionFederatedContainer.transition}
    >
      <div
        className={`${
          mobile || tablet
            ? 'federatedSearch__wrapper-mobile'
            : 'federatedSearch__wrapper'
        }`}
      >
        <div className="federatedSearch__left">
          {/* If don't want this sections go into config file  */}
          {isRecentSearch && !mobile && !tablet && <RecentSearches />}
          {/* If don't want this sections go into config file  */}
          {isQuerySuggestions && (
            <InstantSearch
              searchClient={search}
              indexName={indexName.indexSuggestion}
            >
              <Configure
                hitsPerPage={3}
                query={query}
                userToken={personaSelect}
                enablePersonalization={true}
              />
              <QuerySuggestions />
            </InstantSearch>
          )}
          {/* If don't want this sections go into config file  */}
          {isCategory && !mobile && !tablet && (
            <Category attribute={categories.attribute} />
          )}
        </div>
        {/* If don't want this sections go into config file  */}
        {isProduct && (
          <div className="federatedSearch__middle">
            <Configure
              filters=""
              hitsPerPage={6}
              userToken={personaSelect}
              enablePersonalization={true}
            />
            <Products />
          </div>
        )}
        {/* If don't want this sections go into config file  */}
        {isBlogPosts && !mobile && !tablet && (
          <div className="articles federatedSearch__right">
            <Index
              // searchClient={search}
              indexName={indexName.indexBlog}
            >
              <Configure hitsPerPage={1} query={query} />
              <Articles />
            </Index>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default memo(FederatedSearch);
