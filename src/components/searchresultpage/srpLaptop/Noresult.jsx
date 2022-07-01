import RelatedItem from '@/components/recommend/relatedItems/RelatedProducts';

// To display if no results
// Recommend
import algoliarecommend from '@algolia/recommend';
import { RelatedProducts } from '@algolia/recommend-react';

// Algolia search client
import { mainIndex, searchClientCreds } from '@/config/algoliaEnvConfig';

// define the client for using Recommend
const recommendClient = algoliarecommend(
  searchClientCreds.appID,
  searchClientCreds.APIKey
);

import { Configure, Index, useHits } from 'react-instantsearch-hooks-web';

// Recoil state to directly access results
import { shouldHaveInjectedBanners } from '@/config/featuresConfig';
import { queryAtom } from '@/config/searchboxConfig';
import { useRecoilValue } from 'recoil';

// Import Components
import Banner from '@/components/banners/Banner';
import QuerySuggestions from '@/components/federatedSearch/components/QuerySuggestions';
import SrpLaptop from './SrpLaptop';

// Config suggestions
import { indexNames } from '@/config/algoliaEnvConfig';

// Federated congif from recoil
import { federatedSearchConfig } from '@/config/federatedConfig';

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

function NoResultsHandler(props) {
  // Do you want to show banner on SRP? This boolean tells us yes or no
  const shouldDisplayBanners = useRecoilValue(shouldHaveInjectedBanners);
  const { hits } = useHits(props);
  return hits.length > 0 ? (
    <div>
      {shouldDisplayBanners && <Banner />}
      <SrpLaptop />
    </div>
  ) : (
    <NoResults />
  );
}

export { NoResults, NoResultsHandler };
