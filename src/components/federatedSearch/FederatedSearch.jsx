import { useRef, useEffect, memo } from 'react';

// Algolias's import
import { Configure, Index } from 'react-instantsearch-dom';

// framer motion
import { motion } from 'framer-motion';
import { framerMotionFederatedContainer } from '@/config/animationConfig';

// import from Recoil
import { useSetRecoilState, useRecoilValue, useRecoilState } from 'recoil';

// Config
import { searchClient, indexNames } from '@/config/algoliaEnvConfig';

// Show or unshow sections in federated (product, suggestions, categories, articles, recent searches)
// categories import is here to choose which attribute you want to show as category
import {
  federatedSearchConfig,
  federatedCategoriesAttribute,
  shouldHaveOpenFederatedSearch,
  federatedRef,
} from '@/config/federatedConfig';

// Sharing query to general state
import { queryAtom, searchBoxAtom } from '@/config/searchboxConfig';

// Import Persona State from recoil
import { personaSelectedAtom } from '@/config/personaConfig';

// Import Segment State from recoil
import { segmentSelectedAtom } from '@/config/segmentConfig';

// Import refs for modal closing functionality
import { selectorNavigationRef } from '@/config/headerConfig';

// hook import
// Check if user is clecking outside an element
import useOutsideClickTwoConditionals from '@/hooks/useOutsideClickTwoConditions';
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
  const segmentSelect = useRecoilValue(segmentSelectedAtom);
  const setIsFederated = useSetRecoilState(shouldHaveOpenFederatedSearch);
  const searchboxRef = useRecoilValue(searchBoxAtom);
  const query = useRecoilValue(queryAtom);

  //Get reference for dropdowns in Navigation
  const selector = useRecoilValue(selectorNavigationRef);

  // Get Indexes Name
  const { suggestionsIndex, articlesIndex } = useRecoilValue(indexNames);

  // const containerFederated = useRef('');
  const [containerFederated, setContainerFederated] =
    useRecoilState(federatedRef);

  // Get screen size
  const { mobile, tablet } = useScreenSize();

  // Custom hook

  useOutsideClickTwoConditionals(
    containerFederated,
    searchboxRef,
    selector,
    () => setIsFederated(false)
  );

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
      setIsFederated(false);
    };
  }, []);

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
      className={`${
        mobile || tablet ? 'federatedSearch-mobile' : 'federatedSearch'
      }`}
      ref={setContainerFederated}
      variants={framerMotionFederatedContainer}
      initial={framerMotionFederatedContainer.initial}
      animate={framerMotionFederatedContainer.animate}
      exit={framerMotionFederatedContainer.exit}
      transition={framerMotionFederatedContainer.transition}
    >
      <span className="closeFederated" onClick={() => setIsFederated(false)}>
        &lsaquo; Return to Homepage
      </span>
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
            <Index searchClient={searchClient} indexName={suggestionsIndex}>
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
              optionalFilters={segmentSelect}
              enablePersonalization={true}
            />
            <Products />
          </div>
        )}
        {/* If don't want this sections go into config file  */}
        {showBlogPosts && !mobile && !tablet && (
          <div className="articles federatedSearch__right">
            <Index indexName={articlesIndex}>
              <Configure hitsPerPage={1} query={query} />
              <Articles />
            </Index>
          </div>
        )}
      </div>
      <Redirect />
    </motion.div>
  );
};

export default memo(FederatedSearch);
