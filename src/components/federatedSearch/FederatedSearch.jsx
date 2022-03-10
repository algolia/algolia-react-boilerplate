import React, { useRef, memo } from 'react';

// Algolias's import
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, Configure } from 'react-instantsearch-dom';

// framer motion
import { motion } from 'framer-motion';
import { framerMotionFederatedContainer } from '../../config/config';

// import from Recoil
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import {
  configAtom,
  isFederatedAtom,
  searchBoxAtom,
  selectButtonAtom,
} from '../../config/config';
import { indexName, searchClient } from '../../config/appConfig';
// Import Persona State from recoil
import { personaSelectedAtom } from '../../config/header';

// hook import
import useOutsideClickConditional from '../../hooks/useOutsideClickConditional';
import useScreenSize from '../../hooks/useScreenSize';

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
  useOutsideClickConditional(containerFederated, searchboxRef, () =>
    setIsFederated(false)
  );
  const { mobile, tablet } = useScreenSize();
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
          {isRecentSearch && !mobile && !tablet && <RecentSearches />}
          {isQuerySuggestions && (
            <InstantSearch
              searchClient={search}
              indexName={indexName.indexSuggestion}
            >
              <Configure hitsPerPage={3} />
              <QuerySuggestions />
            </InstantSearch>
          )}
          {isCategory && !mobile && !tablet && (
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
        {isBlogPosts && !mobile && !tablet && (
          <div className="articles federatedSearch__right">
            <InstantSearch
              searchClient={search}
              indexName={indexName.indexBlog}
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
