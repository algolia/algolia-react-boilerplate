// Page for displaying search results
// Includes functionality for banners, query suggestions, noresults
// It also renders different search results components depending on screen size

// import React functionality
import { memo, useEffect, lazy, Suspense } from 'react';

import Loader from '@/components/loader/Loader';

// eslint-disable-next-line import/order
import {
  Configure,
  connectStateResults,
  Index,
  connectSearchBox,
} from 'react-instantsearch-dom';

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
import { mainIndex, indexNames } from '@/config/algoliaEnvConfig';
import { shouldHaveOpenFederatedSearch } from '@/config/federatedConfig';

const SrpLaptop = lazy(() =>
  import('@/components/searchresultpage/srpLaptop/SrpLaptop')
);
const SrpMobile = lazy(() =>
  import('@/components/searchresultpage/srpMobile/SrpMobile')
);

const SearchResultPage = () => {
  // Recoil & React states

  // Do you want to show banner on SRP? This boolean tells us yes or no
  const shouldDisplayBanners = useRecoilValue(shouldHaveInjectedBanners);
  // Close federated and set value false for return without it
  const setFederatedOpen = useSetRecoilState(shouldHaveOpenFederatedSearch);
  setFederatedOpen(false);

  // Handle screen resize
  const { mobile, tablet, laptopXS, laptop } = useScreenSize();

  return (
    <>
      {/* Display the banner if the bannerSrp config is set to: true */}
      {shouldDisplayBanners && <Banner />}
      {/* This wrapper will  decide to render the NoResults component if there are no results from the search */}

      <NoResultsHandler>
        <Suspense fallback={<Loader />}>
          {(laptop || laptopXS) && <SrpLaptop />}
          {(tablet || mobile) && <SrpMobile />}
        </Suspense>
      </NoResultsHandler>
    </>
  );
};

// This is rendered when there are no results to display
const NoResults = memo(({ query }) => {
  const getQueryState = useRecoilValue(queryAtom);
  // Get QS index from Recoil
  const { suggestionsIndex } = useRecoilValue(indexNames);
  return (
    <div className="no-results">
      <div className="no-results__infos">
        <h4 className="no-results__titles">
          <span className="no-results__titles__span">
            Sorry, we found no result for{' '}
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
            <Index indexId={suggestionsIndex} indexName={suggestionsIndex}>
              <Configure hitsPerPage={3} query="" />
              <QuerySuggestions />
            </Index>
            {/* Add this searchBox Invisible to refine when we click on a suggestion */}
            <CustomSearchBox query={getQueryState} />
          </div>
        </ul>
      </div>
    </div>
  );
});

// This wrapper decides when to render the NoResults component
const NoResultsHandlerComponent = ({
  children,
  searchState,
  searchResults,
  searching,
}) => {
  return (
    // If there is a search, but there are no results to display, render NoResults component
    searchState?.query && searchResults?.nbHits === 0 ? (
      <NoResults query={searchState.query} isSearching={searching} />
    ) : (
      // Otherwise, just return the search results
      <>{children}</>
    )
  );
};

const NoResultsHandler = connectStateResults(NoResultsHandlerComponent);

// "This searchbox is virtual and will not appear in the DOM. The goal of this virtual searchbox is to refine the app by changing the query state
// in the main IS instance when clicking on QS when we're in the noResult component"
const SearchBox = ({ refine, query }) => {
  const refineFunction = (queryValue) => {
    refine(queryValue);
  };
  useEffect(() => {
    refineFunction(query);
  }, [query]);

  return (
    <form noValidate action="" role="search" className="search-box-invisible">
      <input
        type="search"
        value={query}
        onChange={(event) => {
          refine(event.currentTarget.value);
        }}
      />
    </form>
  );
};

const CustomSearchBox = connectSearchBox(SearchBox);

export default SearchResultPage;
