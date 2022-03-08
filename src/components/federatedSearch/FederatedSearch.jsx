import React, { useRef, memo } from 'react';

// Algolias's import
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, Configure } from 'react-instantsearch-dom';

// framer motion
import { motion } from 'framer-motion';
import { federatedItem } from '../../config/config';

// import from Recoil
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import {
  configAtom,
  isFederatedAtom,
  searchBoxAtom,
  selectButtonAtom,
} from '../../config/config';
// Import Persona State from recoil
import { personaSelectedAtom } from '../../config/header';

// hook import
import useOutsideClickConditional from '../../hooks/useOutsideClickConditional';

// Components imports
import RecentSearches from './components/RecentSearches';
import QuerySuggestions from './components/QuerySuggestions';
import Category from './components/Category';
import Products from './components/Products';
import Articles from './components/BlogPost';

const FederatedSearch = () => {
  // Recoil & States
  const [config] = useRecoilState(configAtom);
  const personaSelect = useRecoilValue(personaSelectedAtom);
  const setIsFederated = useSetRecoilState(isFederatedAtom);
  const searchboxRef = useRecoilValue(searchBoxAtom);
  const selectRef = useRecoilValue(selectButtonAtom);
  const containerFederated = useRef('');
  // Custom hook
  useOutsideClickConditional(containerFederated, searchboxRef, selectRef, () =>
    setIsFederated(false)
  );
  // Persona
  const userToken = personaSelect;

  // Federated search configuration
  const {
    isRecentSearch,
    isQuerySuggestions,
    isCategory,
    isBlogPosts,
    isProduct,
  } = config.federatedSearchConfig;
  // Algolia searchclient
  const search = algoliasearch(
    config.searchClient.appID,
    config.searchClient.APIKey
  );

  return (
    <motion.div
      className="federatedSearch"
      ref={containerFederated}
      variants={federatedItem}
      initial={federatedItem.initial}
      animate={federatedItem.animate}
      exit={federatedItem.exit}
      transition={federatedItem.transition}
    >
      <div className="federatedSearch__wrapper">
        <div className="federatedSearch__left">
          {isRecentSearch && <RecentSearches />}
          {isQuerySuggestions && (
            <InstantSearch
              searchClient={search}
              indexName={config.indexName.indexSuggestion}
            >
              <Configure hitsPerPage={3} />
              <QuerySuggestions />
            </InstantSearch>
          )}
          {isCategory && (
            <Category
              attribute={config.federatedCategory.categoryInFederated}
            />
          )}
        </div>
        {isProduct && (
          <div className="federatedSearch__middle">
            <Configure
              filters=""
              hitsPerPage={6}
              userToken={userToken}
              // enablePersonalization={true}
            />
            <Products />
          </div>
        )}
        {isBlogPosts && (
          <div className="articles federatedSearch__right">
            <InstantSearch
              searchClient={search}
              indexName={config.indexName.indexBlog}
            >
              <Configure hitsPerPage={1} />
              <Articles />
            </InstantSearch>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default memo(FederatedSearch);
