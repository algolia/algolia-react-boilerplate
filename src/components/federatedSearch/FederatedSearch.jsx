import { memo, useEffect } from 'react';

// Algolias's import
import { Configure, Index } from 'react-instantsearch-hooks-web';

// framer motion
import { framerMotionFederatedContainer } from '@/config/animationConfig';

// import from Recoil
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

// Config
import { indexNames, searchClient } from '@/config/algoliaEnvConfig';

// Show or unshow sections in federated (product, suggestions, categories, articles, recent searches)
// categories import is here to choose which attribute you want to show as category
import {
  federatedCategoriesAttribute,
  federatedRef,
  federatedSearchConfig,
  shouldHaveOpenFederatedSearch,
} from '@/config/federatedConfig';

// Sharing query to general state
import { queryAtom, searchBoxAtom } from '@/config/searchboxConfig';

// Import Persona State from recoil
import { personalizationImpact, personaSelectedAtom, personaSelectedFiltersAtom } from '@/config/personaConfig';

// Import Segment State from recoil
import { segmentSelectedAtom } from '@/config/segmentConfig';

// Import refs for modal closing functionality
import { selectorNavigationRef } from '@/config/headerConfig';

// hook import
// Check if user is clecking outside an element
import useOutsideClickTwoConditionals from '@/hooks/useOutsideClickTwoConditions';
// Check screensize for responsiveness
import { windowSize } from '@/hooks/useScreenSize';

// Components imports
import Redirect from '@/components/redirects/Redirect';
import Articles from './components/BlogPost';
import Category from './components/Category';
import Products from './components/Products';
import QuerySuggestions from './components/QuerySuggestions';
import RecentSearches from './components/RecentSearches';

//Import scope SCSS
import './SCSS/federatedSearch.scss';

const FederatedSearch = () => {
  // Persona
  const personaSelect = useRecoilValue(personaSelectedAtom);
  const personalizationFilters = useRecoilValue(personaSelectedFiltersAtom);


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
  const { mobile, tablet } = useRecoilValue(windowSize);

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
    <div
      className={`${mobile || tablet ? 'federatedSearch-mobile' : 'federatedSearch'
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
        className={`${mobile || tablet
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
                personalizationImpact={personalizationImpact}
                personalizationFilters={personalizationFilters}
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
              enablePersonalization={true}
              userToken={personaSelect}
              personalizationImpact={personalizationImpact}
              personalizationFilters={personalizationFilters}
              optionalFilters={segmentSelect}
              query={query}
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
    </div>
  );
};

export default memo(FederatedSearch);
