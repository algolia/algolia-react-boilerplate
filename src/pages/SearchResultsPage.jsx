// Page for displaying search results
// Includes functionality for banners, query suggestions, noresults
// It also renders different search results components depending on screen size

// import React functionality
import { memo, useEffect, lazy, Suspense, useRef, useState } from 'react';

// To display if no results
// Recommend
import { RelatedProducts } from '@algolia/recommend-react';
import algoliarecommend from '@algolia/recommend';
import RelatedItem from '@/components/recommend/RelatedProducts';
import SkeletonLoader from '@/components/hits/HitsSkeletonLoader';

// Algolia search client
import { searchClientCreds, mainIndex } from '@/config/algoliaEnvConfig';
import ClipLoader from 'react-spinners/ClipLoader';

// define the client for using Recommend
const recommendClient = algoliarecommend(
  searchClientCreds.appID,
  searchClientCreds.APIKey
);

import Loader from '@/components/loader/Loader';

import { useHits, Configure, Index } from 'react-instantsearch-hooks-web';

// Recoil state to directly access results
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { queryAtom } from '../config/searchboxConfig';

// Import custom Hooks
import useScreenSize from '@/hooks/useScreenSize';

// Import Components
import QuerySuggestions from '@/components/federatedSearch/components/QuerySuggestions';
import Banner from '@/components/banners/Banner';

// Import Persona State from recoil
import { shouldHaveInjectedBanners } from '@/config/featuresConfig';

// Config suggestions
import { indexNames } from '@/config/algoliaEnvConfig';

import {
  federatedSearchConfig,
  shouldHaveOpenFederatedSearch,
} from '@/config/federatedConfig';
import { AnimatePresence } from 'framer-motion';

const SrpLaptop = lazy(() =>
  import('@/components/searchresultpage/srpLaptop/SrpLaptop')
);
const SrpMobile = lazy(() =>
  import('@/components/searchresultpage/srpMobile/SrpMobile')
);

const SearchResultPage = ({ setIsMounted }) => {
  const [srpIsLoaded, setSrpIsLoaded] = useState(false);
  // Close federated and set value false for return without it
  const setFederatedOpen = useSetRecoilState(shouldHaveOpenFederatedSearch);

  useEffect(() => {
    setFederatedOpen(false);
  }, []);

  // Handle screen resize
  const { mobile, tablet, laptopXS, laptop } = useScreenSize();
  const srpMounted = useRef(false);
  useEffect(() => {
    srpMounted.current = true;
    setIsMounted(srpMounted.current);
    return () => {
      srpMounted.current = false;
      setIsMounted(srpMounted.current);
    };
  }, []);

  const [useSkeleton, setUseSkeleton] = useState(true);

  // This will run one time after the component mounts
  useEffect(() => {
    const onPageLoad = () => {
      setUseSkeleton(false);
    };

    // Check if the page has already loaded
    if (document.readyState === 'complete') {
      onPageLoad();
    } else {
      window.addEventListener('load', onPageLoad);
      // Remove the event listener when component unmounts
      return () => window.removeEventListener('load', onPageLoad);
    }
  }, []);

  return (
    <div ref={srpMounted} className="srp">
      {/* Display the banner if the bannerSrp config is set to: true */}
      {/* {shouldDisplayBanners && <Banner />} */}
      {/* This wrapper will  decide to render the NoResults component if there are no results from the search */}
      {/* <NoResultsHandler>
        <Suspense fallback={<Loader />}> */}
      {/* {(laptop || laptopXS) && <SrpLaptop />} */}
      {/* {(tablet || mobile) && <SrpMobile />} */}
      {/* </Suspense>
      </NoResultsHandler> */}
      <NoResultsHandler
        srpIsLoaded={srpIsLoaded}
        setSrpIsLoaded={setSrpIsLoaded}
      />
    </div>
  );
};

// This is rendered when there are no results to display
const NoResults = () => {
  //Get the query
  const getQueryState = useRecoilValue(queryAtom);
  const getSearches = localStorage.getItem('objectId');
  const cleanSearches = JSON.parse(getSearches);
  const lastId = cleanSearches?.[cleanSearches.length - 1];
  // Get QS index from Recoil
  const { suggestionsIndex } = useRecoilValue(indexNames);
  // Get the main index
  const index = useRecoilValue(mainIndex);
  return (
    <div className="no-results">
      <div className="no-results__infos">
        <h4 className="no-results__titles">
          <span className="no-results__titles__span">
            Sorry, we found no result for{' '}
          </span>
          <span className="no-results__titles__span-query">
            “{getQueryState}”
          </span>
        </h4>
        <p>Try the following:</p>
        <ul className="no-results__infos">
          <li>
            <span className="no-results__infos__span">Check your spelling</span>
          </li>
          {/* No Result suggestions displayed when Query Suggestions are active */}
          {federatedSearchConfig.showQuerySuggestions && (
            <>
              <li>
                <span className="no-results__infos__span">
                  Or check our suggestions below 👇
                </span>
              </li>
              <div className="query-suggestion">
                <Index indexId={suggestionsIndex} indexName={suggestionsIndex}>
                  <Configure hitsPerPage={3} query="" />
                  <QuerySuggestions />
                </Index>
                {/* Add this searchBox Invisible to refine when we click on a suggestion */}
                {/* <CustomSearchBox query={getQueryState} /> */}
              </div>
              {lastId && (
                <div>
                  <p className="no-results__infos__p">
                    Customers who searched <span>{getQueryState}</span> also
                    viewed:
                  </p>
                  <div className="recommend">
                    {/* <RelatedProducts
                      recommendClient={recommendClient}
                      indexName={index}
                      objectIDs={[lastId]}
                      itemComponent={RelatedItem}
                      maxRecommendations={5}
                    /> */}
                  </div>
                </div>
              )}
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

// This wrapper decides when to render the NoResults component
// const NoResultsHandlerComponent = ({
//   children,
//   searchState,
//   searchResults,
//   searching,
// }) => {
//   return (
// If there is a search, but there are no results to display, render NoResults component
// searchState?.query && searchResults?.nbHits === 0 ? (
//   <NoResults query={searchState.query} isSearching={searching} />
// ) : (
// Otherwise, just return the search results
//       <>{children}</>
//     )
//   );
// };

// const NoResultsHandler = connectStateResults(NoResultsHandlerComponent);

function NoResultsHandler(props) {
  const { hits } = useHits(props);
  console.log(
    '🚀 ~ file: SearchResultsPage.jsx ~ line 207 ~ NoResultsHandler ~ hits',
    hits.length
  );
  // Do you want to show banner on SRP? This boolean tells us yes or no
  const shouldDisplayBanners = useRecoilValue(shouldHaveInjectedBanners);
  // Handle screen resize
  const { mobile, tablet, laptopXS, laptop } = useScreenSize();
  const { setSrpIsLoaded } = props;
  const { srpIsLoaded } = props;
  useEffect(() => {
    console.log('UseEffect');
    return () => {
      const length = hits.length;
      return length;
    };
  }, [hits, length]);
  console.log(length);

  return length > 0 ? (
    <Suspense fallback={<Loader />}>
      {(laptop || laptopXS) && (
        /* Display the banner if the bannerSrp config is set to: true */
        <div>
          {/* Create a skeleton while page is loading */}
          <AnimatePresence>
            {srpIsLoaded === false && <SkeletonLoader />}
          </AnimatePresence>
          {/* {shouldDisplayBanners && <Banner />} */}
          <SrpLaptop
            setSrpIsLoaded={setSrpIsLoaded}
            srpIsLoaded={srpIsLoaded}
          />
        </div>
      )}
      {(tablet || mobile) && (
        <SrpMobile setSrpIsLoaded={setSrpIsLoaded} srpIsLoaded={srpIsLoaded} />
      )}
    </Suspense>
  ) : (
    <NoResults />
  );
}

export default SearchResultPage;
