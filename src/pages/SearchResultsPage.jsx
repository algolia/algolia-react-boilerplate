import algoliasearch from 'algoliasearch/lite';
import React, { useState, memo } from 'react';
// eslint-disable-next-line import/order
import {
  Pagination,
  Configure,
  Index,
  connectStateResults,
  InstantSearch,
} from 'react-instantsearch-dom';

// React router import
import { useLocation } from 'react-router-dom';
// Recoil state to directly access results
import { useRecoilState, useRecoilValue } from 'recoil';

// import framer motion
import { motion } from 'framer-motion';
import { pageItem, facetItem } from '../config/config';

// Import Components
import CustomClearRefinements from '../components/facets/ClearRefinement';
import CustomCurrentRefinements from '../components/facets/CurrentRefinement';
import GenericRefinementList from '../components/facets/Facets';
// Import Components
import QuerySuggestions from '../components/federatedSearch/components/QuerySuggestions';
import CustomHitsComponent from '../components/hits/CustomHits';
import GiftCard from '../components/hits/GiftCard';
import { Hit } from '../components/hits/Hits';
import InfluencerCard from '../components/hits/InfluencerCard';
import NikeCard from '../components/hits/SalesCard';
import Banner from '../components/searchresultpage/Banner';
import CustomSortBy from '../components/searchresultpage/SortBy';
import { CustomStats } from '../components/searchresultpage/Stats';
import { InjectedHits } from '../components/searchresultpage/injected-hits';
// Import Persona State from recoil
import { configAtom, indexName, indexInfluencer } from '../config/config';
import { personaSelectedAtom } from '../config/header';
// Import Config File
import { queryAtom } from '../config/searchbox';
import { customDataByType } from '../utils';

const SearchResultPage = () => {
  // Recoil & React states
  const [config] = useRecoilState(configAtom);
  const [injected, setInjected] = useState(false);
  const queryState = useRecoilValue(queryAtom);

  // Define Stat Const
  const stats = config.stats.value;
  const hitsPerPageNotInjected = config.hitsPerPage.numberNotInjected;
  const hitsPerPageInjected = config.hitsPerPage.numberInjected;
  const bannerDisplay = config.bannerSrp.value;
  const injectedValue = config.injectedHits.value;

  // Define Price Sort By Const
  const priceSortBy = config.sortBy.value;
  const labelItems = config.sortBy.labelIndex;

  // Get states of React Router
  const { state } = useLocation();
  const personaSelect = useRecoilValue(personaSelectedAtom);
  // Persona
  const userToken = personaSelect;
  return (
    <>
      {bannerDisplay && <Banner />}
      <NoResultsHandler>
        <div className="srp-container">
          <motion.div
            variants={facetItem}
            initial={facetItem.initial}
            animate={facetItem.animate}
            exit={facetItem.exit}
            transition={facetItem.transition}
            className="srp-container__facets"
          >
            <GenericRefinementList />
          </motion.div>
          <motion.div
            className="srp-container__hits"
            variants={pageItem}
            initial={pageItem.initial}
            animate={pageItem.animate}
            exit={pageItem.exit}
            transition={pageItem.transition}
          >
            <div className="srp-container__stats-sort">
              {stats && <CustomStats />}
              {priceSortBy && (
                <CustomSortBy
                  items={labelItems}
                  defaultRefinement={indexName.index}
                />
              )}
            </div>

            <div className="refinement-container">
              <CustomCurrentRefinements />
              <CustomClearRefinements />
            </div>
            <Configure
              hitsPerPage={
                injected ? hitsPerPageInjected : hitsPerPageNotInjected
              }
              analytics={false}
              userToken={userToken}
              enablePersonalization={true}
              filters={state ? state : ''}
              query={queryState && queryState}
            />
            <Index indexName={indexInfluencer.index}>
              <Configure hitsPerPage={1} page={0} />
            </Index>
            {injectedValue ? (
              <InjectedHits
                hitComponent={Hit}
                slots={({ resultsByIndex }) => {
                  const indexValue = indexName.index;
                  const indexInfluencerValue = indexInfluencer.index;
                  const { noCta, nikeCard } = customDataByType(
                    resultsByIndex?.[indexValue]?.userData
                  );
                  // eslint-disable-next-line no-lone-blocks
                  {
                    // eslint-disable-next-line no-unused-expressions
                    nikeCard && setInjected(true);
                  }
                  return [
                    {
                      getHits: () => [noCta],
                      injectAt: noCta ? noCta.position : null,
                      slotComponent: GiftCard,
                    },
                    {
                      getHits: () => [nikeCard],
                      injectAt: nikeCard ? nikeCard.position : null,
                      slotComponent: NikeCard,
                    },
                    {
                      injectAt: ({ position }) => position === 2,
                      // eslint-disable-next-line no-shadow
                      getHits: ({ resultsByIndex }) => {
                        setInjected(true);
                        return resultsByIndex[indexInfluencerValue]
                          ? resultsByIndex[indexInfluencerValue].hits || []
                          : [];
                      },
                      slotComponent: InfluencerCard,
                    },
                  ];
                }}
              />
            ) : (
              <CustomHitsComponent />
            )}
            <Pagination />
          </motion.div>
        </div>
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
