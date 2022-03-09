import algoliasearch from 'algoliasearch/lite';
import React, { memo } from 'react';
// eslint-disable-next-line import/order
import {
  Configure,
  connectStateResults,
  InstantSearch,
} from 'react-instantsearch-dom';

// Recoil state to directly access results
import { useRecoilState } from 'recoil';

// Import custom Hooks
import useScreenSize from '../hooks/useScreenSize';

// Import Components
import QuerySuggestions from '../components/federatedSearch/components/QuerySuggestions';
import Banner from '../components/searchresultpage/Banner';

// Import Persona State from recoil
import { configAtom } from '../config/config';

import SrpLaptop from '../components/searchresultpage/srpLaptop/SrpLaptop';
import SrpMobile from '../components/searchresultpage/srpMobile/SrpMobile';

const SearchResultPage = () => {
  // Recoil & React states
  const [config] = useRecoilState(configAtom);

  // Handle Banner
  const bannerDisplay = config.bannerSrp.value;
  // Handle screen resize
  const { mobile, tablet, laptopXS, laptop } = useScreenSize();
  return (
    <>
      {bannerDisplay && <Banner />}
      <NoResultsHandler>
        {(laptop || laptopXS) && <SrpLaptop />}
        {(tablet || mobile) && <SrpMobile />}
      </NoResultsHandler>
    </>
  );
};

const NoResults = memo(function NoResults({ query }) {
  const [config] = useRecoilState(configAtom);
  const search = algoliasearch(
    config.searchClient.appID,
    config.searchClient.APIKey
  );
  return (
    <div className="no-results">
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
          <InstantSearch
            searchClient={search}
            indexName={config.indexName.indexSuggestion}
          >
            <Configure hitsPerPage={3} />
            <QuerySuggestions />
          </InstantSearch>
        </div>
      </ul>
    </div>
  );
});

const NoResultsHandlerComponent = ({
  children,
  searchState,
  searchResults,
  searching,
}) => {
  if (searchState?.query && searchResults?.nbHits === 0) {
    return <NoResults query={searchState.query} isSearching={searching} />;
  }

  return <>{children}</>;
};

const NoResultsHandler = connectStateResults(memo(NoResultsHandlerComponent));

export default SearchResultPage;
