// Page for displaying search results
// Includes functionality for banners, query suggestions, noresults
// It also renders different search results components depending on screen size

// import React functionality
import { useEffect, useRef, useState } from 'react';

// To display if no results
// Recommend
import RelatedItem from '@/components/recommend/RelatedProducts';
import algoliarecommend from '@algolia/recommend';
import { RelatedProducts } from '@algolia/recommend-react';

// Algolia search client
import { mainIndex, searchClientCreds } from '@/config/algoliaEnvConfig';
import connectStats from 'instantsearch.js/es/connectors/stats/connectStats';
import { useConnector } from 'react-instantsearch-hooks-web';

// define the client for using Recommend
const recommendClient = algoliarecommend(
  searchClientCreds.appID,
  searchClientCreds.APIKey
);

import { Configure, Index } from 'react-instantsearch-hooks-web';

// Recoil state to directly access results
import { hitsNumber } from '@/config/hitsConfig';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { queryAtom } from '../config/searchboxConfig';

// Import Components
import QuerySuggestions from '@/components/federatedSearch/components/QuerySuggestions';
import SrpLaptop from '@/components/searchresultpage/srpLaptop/SrpLaptop';
import Banner from '@/components/banners/Banner';

// Config suggestions
import { indexNames } from '@/config/algoliaEnvConfig';
// Import Banner State from recoil
import { shouldHaveInjectedBanners } from '@/config/featuresConfig';

// Federated congif from recoil
import {
  federatedSearchConfig,
  shouldHaveOpenFederatedSearch,
} from '@/config/federatedConfig';

const SearchResultPage = ({ setIsMounted }) => {
  const [srpIsLoaded, setSrpIsLoaded] = useState(false);
  // Close federated and set value false for return without it
  const setFederatedOpen = useSetRecoilState(shouldHaveOpenFederatedSearch);

  useEffect(() => {
    setFederatedOpen(false);
  }, []);

  // Handle screen resize
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
      <VistualCustomStats />
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
                <Index
                  indexId="suggestions-no-results"
                  indexName={suggestionsIndex}
                >
                  <Configure hitsPerPage={3} query="" />
                  <QuerySuggestions />
                </Index>
                {/* Add this searchBox Invisible to refine when we click on a suggestion */}
              </div>
              {lastId && (
                <div>
                  <p className="no-results__infos__p">
                    Customers who searched <span>{getQueryState}</span> also
                    viewed:
                  </p>
                  <div className="recommend">
                    <RelatedProducts
                      recommendClient={recommendClient}
                      indexName={index}
                      objectIDs={[lastId]}
                      itemComponent={RelatedItem}
                      maxRecommendations={5}
                    />
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

const NoResultsHandler = () => {
  // Do you want to show banner on SRP? This boolean tells us yes or no
  const shouldDisplayBanners = useRecoilValue(shouldHaveInjectedBanners);
  const hits = useRecoilValue(hitsNumber);
  return hits > 0 ? (
    <div>
      {shouldDisplayBanners && <Banner />}
      <SrpLaptop />
    </div>
  ) : (
    <NoResults />
  );
};

export default SearchResultPage;

// "This Stats component is virtual and will not appear in the DOM. The goal of this virtual searchbox is to refine the app by changing the query state
// in the main IS instance when clicking on QS when we're in the noResult component"
// This is for building the stats info that is displayed above the items in the search results page
function useStats(props) {
  return useConnector(connectStats, props);
}

function VistualCustomStats(props) {
  const setNumberHits = useSetRecoilState(hitsNumber);
  const { nbHits } = useStats(props);

  useEffect(() => {
    setNumberHits(nbHits);
  }, [nbHits]);

  return '';
}
