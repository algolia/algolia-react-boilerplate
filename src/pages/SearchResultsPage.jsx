// Page for displaying search results
// Includes functionality for banners, query suggestions, noresults
// It also renders different search results components depending on screen size

// import React functionality
import { memo } from 'react';

// eslint-disable-next-line import/order
import {
  Configure,
  connectStateResults,
  Index,
} from 'react-instantsearch-dom';

// Recoil state to directly access results
import { useRecoilValue } from 'recoil';

// Import custom Hooks
import useScreenSize from '../hooks/useScreenSize';

// Import Components
import QuerySuggestions from '../components/federatedSearch/components/QuerySuggestions';
import Banner from '../components/banners/Banner';

// Import Persona State from recoil
import { isBannerSrp } from '../config/config';
import { indexName } from '../config/algoliaEnvConfig';

import SrpLaptop from '../components/searchresultpage/srpLaptop/SrpLaptop';
import SrpMobile from '../components/searchresultpage/srpMobile/SrpMobile';

const SearchResultPage = () => {
  // Recoil & React states

  // Do you want to show banner on SRP? This boolean tells us yes or no
  const shouldDisplayBanners = useRecoilValue(isBannerSrp);

  // Handle screen resize
  const { mobile, tablet, laptopXS, laptop } = useScreenSize();

  return (
    <>
      {/* Display the banner if the bannerSrp config is set to: true */}
      {shouldDisplayBanners && <Banner />}
      {/* This wrapper will  decide to render the NoResults component if there are no results from the search */}
      <NoResultsHandler>
        {(laptop || laptopXS) && <SrpLaptop />}
        {(tablet || mobile) && <SrpMobile />}
      </NoResultsHandler>
    </>
  );
};

// This is rendered when there are no results to display
const NoResults = memo(({ query }) => (
    <div className="no-results">
      <div className="no-results__infos">
        <h4 className="no-results__titles">
          <span className="no-results__titles__span">
            Sorry, we found no results for{' '}
          </span>
          <span className="no-results__titles__span-query">“{query}”</span>
        </h4>
        <p>Try the following:</p>
        <ul className="no-results__infos">
          <li>
            <span className="no-results__infos__span">Check your spelling</span>
          </li>
          <li>
            <span className="no-results__infos__span">
              Or check our suggestions bellow 👇
            </span>
          </li>
          <div className="query-suggestion">
            <Index
              indexId={indexName.indexSuggestion}
              indexName={indexName.indexSuggestion}
            >
              <Configure hitsPerPage={3} />
              <QuerySuggestions />
            </Index>
          </div>
        </ul>
      </div>
    </div>
));

// This wrapper decides when to render the NoResults component
const NoResultsHandlerComponent = ({
  children,
  searchState,
  searchResults,
  searching,
}) => (
  // If there is a search, but there are no results to display, render NoResults component
    searchState?.query && searchResults?.nbHits === 0 ?
     <NoResults query={searchState.query} isSearching={searching} />
     // Otherwise, just return the search results
    : <>{children}</>
  
);

const NoResultsHandler = connectStateResults(NoResultsHandlerComponent);

export default SearchResultPage;
