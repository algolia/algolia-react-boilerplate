// import IS hook
import { Configure, Index, useSearchBox } from 'react-instantsearch-hooks-web'

// Import recoil function
import { useRecoilValue } from 'recoil'

import { useSearchParams } from 'react-router-dom'

// Recommend
import RelatedItem from '@/components/recommend/relatedItems/RelatedProducts'
import algoliarecommend from '@algolia/recommend'
import { RelatedProducts } from '@algolia/recommend-react'

// Algolia search client
import { mainIndex, searchClientCreds } from '@/config/algoliaEnvConfig'

// define the client for using Recommend
const recommendClient = algoliarecommend(
  searchClientCreds.appID,
  searchClientCreds.APIKey
)

// Import Components
import QuerySuggestions from '@/components/federatedSearch/components/QuerySuggestions'

// Config suggestions
import { indexNames } from '@/config/algoliaEnvConfig'

// Federated congif from recoil
import { federatedSearchConfig } from '@/config/federatedConfig'

import { shouldHaveRelatedProducts } from '@/config/featuresConfig'

import { windowSize } from '@/hooks/useScreenSize'

// This is rendered when there are no results to display
const NoResults = ({ query }) => {
  //Get the query
  const getSearches = localStorage.getItem('objectId')
  const cleanSearches = JSON.parse(getSearches)
  const lastId = cleanSearches?.[cleanSearches.length - 1]
  // Get QS index from Recoil
  const { suggestionsIndex } = useRecoilValue(indexNames)
  // Get the main index
  const index = useRecoilValue(mainIndex)

  const { isDesktop } = useRecoilValue(windowSize)

  const shouldHaveRelatedProductsValue = useRecoilValue(
    shouldHaveRelatedProducts
  )

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
                    Customers who searched <span>{query}</span> also viewed:
                  </p>
                  {shouldHaveRelatedProductsValue && (
                    <div className="recommend">
                      <RelatedProducts
                        recommendClient={recommendClient}
                        indexName={index}
                        objectIDs={[lastId]}
                        itemComponent={RelatedItem}
                        maxRecommendations={isDesktop ? 5 : 2}
                      />
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </ul>
      </div>
    </div>
  )
}

export default NoResults
