import { useRef, memo } from 'react';

// Algolias's import
import algoliasearch from 'algoliasearch/lite';
import { Configure, Index } from 'react-instantsearch-dom';

// framer motion
import { motion } from 'framer-motion';
import { framerMotionFederatedContainer } from '@/config/animationConfig';

// import from Recoil
import { useSetRecoilState, useRecoilValue } from 'recoil';

// Config
import { indexNames, searchClient } from '@/config/algoliaEnvConfig';

// Those imports are here to check if user is clicking outside the searchbox & federated to close federated
import { shouldHaveFederatedSearch } from '@/config/featuresConfig';

// Show or unshow sections in federated (product, suggestions, categories, articles, recent searches)
// categories import is here to choose which attribute you want to show as category
import { federatedSearchConfig, federatedCategoriesAttribute } from '@/config/federatedConfig';

// Sharing query to general state
import { queryAtom, searchBoxAtom } from '@/config/searchboxConfig';

// Import Persona State from recoil
import { personaSelectedAtom } from '@/config/personaConfig';

// hook import
// Check if user is clecking outside an element
import useOutsideClickConditional from '@/hooks/useOutsideClickConditional';
// Check screensize for responsiveness
import useScreenSize from '@/hooks/useScreenSize';

// Components imports
import RecentSearches from './components/RecentSearches';
import QuerySuggestions from './components/QuerySuggestions';
import Category from './components/Category';
import Products from './components/Products';
import Articles from './components/BlogPost';
import Redirect from '@/components/redirects/Redirect';

const FederatedSearch = () => {
  // Recoil & States
  const personaSelect = useRecoilValue(personaSelectedAtom);
  const setIsFederated = useSetRecoilState(shouldHaveFederatedSearch);
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
    showRecentSearches,
    showQuerySuggestions,
    showCategories,
    showBlogPosts,
    showProducts,
  } = federatedSearchConfig;

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
          {showRecentSearches && !mobile && !tablet && <RecentSearches />}
          {/* If don't want this sections go into config file  */}
          {showQuerySuggestions && (
            <Index searchClient={searchClient} indexName={indexNames.suggestionsIndex}>
              <Configure
                hitsPerPage={3}
                query={query}
                userToken={personaSelect}
                enablePersonalization={true}
              />
              <QuerySuggestions />
            </Index>
          )}
          {/* If don't want this sections go into config file  */}
          {showCategories && !mobile && !tablet && (
            <Category attribute={federatedCategoriesAttribute} />
          )}
        </div>
        {/* If don't want this sections go into config file  */}
        {showProducts && (
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
        {showBlogPosts && !mobile && !tablet && (
          <div className="articles federatedSearch__right">
            <Index
              indexName={indexNames.articlesIndex}
            >
              <Configure hitsPerPage={1} query={query} />
              <Articles />
            </Index>
          </div>
        )}
      </div>
      <Redirect/>
    </motion.div>
  );
};

export default memo(FederatedSearch);
