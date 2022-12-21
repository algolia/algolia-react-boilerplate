// Import the custom hits to display in the SRP
// import CustomHits from '../CustomHits';
import { Hit } from '../../Hits'
// Import the config files we'll need to import
import { indexNames } from '@/config/algoliaEnvConfig'
import { useRecoilValue } from 'recoil'

import { lazy, useEffect, useRef, useState } from 'react'
// Algolia
import {
  useInstantSearch,
  useQueryRules,
  useSearchBox,
} from 'react-instantsearch-hooks-web'

// Components
import CustomSkeleton from '@/components/skeletons/CustomSkeleton'
import { windowSize } from '@/hooks/useScreenSize'

// Components lazy loaded

const NoCtaCard = lazy(() => import('../NoCtaCard'))
const SalesCard = lazy(() => import('../SalesCard'))
const InfluencerCard = lazy(() => import('../InfluencerCard'))

// A property that will be added to the injected index hits
const injectedIndexType = 'influencerCard'

// Maps from each injected content type to it's render component
const contentTypeComponentMap = {
  noCta: NoCtaCard,
  salesCard: SalesCard,
  [injectedIndexType]: InfluencerCard,
}

// This component renders the custom query hits, but also injects them with content from rule data or the injection Index
const InjectedHits = (props) => {
  // Get the regular hits
  const { hits, isLastPage, showMore, sendEvent } = props

  // Get custom data from rules
  const { items: ruleData } = useQueryRules(props)

  // Get access to the results from the inject index
  const { scopedResults } = useInstantSearch()

  // Get access to the inject index name
  const { injectedContentIndex } = useRecoilValue(indexNames)

  // Get access to current query
  const query = useSearchBox()

  // Will hold the hits with injected content
  const [injectedHits, setInjectedHits] = useState(hits)

  const { mobile, tablet } = useRecoilValue(windowSize)
  const [hitsLoaded, setHitsLoaded] = useState(false)
  const productCard = useRef(null)

  useEffect(() => {
    if (productCard.current !== null) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isLastPage) {
            showMore()
          }
        })
      })

      observer.observe(productCard.current)

      return () => {
        observer.disconnect()
      }
    }
  }, [isLastPage, hits])

  useEffect(() => {
    if (hits.length > 0) {
      setHitsLoaded(true)
    }
  }, [hits])

  useEffect(() => {
    // Will hold the hits from injection index
    let injectionIndexResults

    // If no query is typed, don't inject from index
    if (query === '') injectionIndexResults = []
    // If there's anything at all typed, inject them
    else {
      // Gets the hits from the injection index
      injectionIndexResults =
        // Get the hits AND add a type property, so that we can identify it later
        scopedResults.find(({ indexId }) => indexId == injectedContentIndex)
          ?.results?.hits ?? []

      // Add the type property
      injectionIndexResults = injectionIndexResults.map((hit) => ({
        ...hit,
        type: injectedIndexType,
      }))
    }

    // Will hold all the items to be injected
    let itemsToInject

    // Add the items from rule data
    itemsToInject = ruleData
      // Only keep items with type either "noCta", "salesCard"
      .filter(({ type }) => type == 'noCta' || type == 'salesCard')
      // Concat the inject index hits
      .concat(injectionIndexResults)
      // Add to each injected item the corresponding component that will render it
      .map((item) => ({
        ...item,
        _component: contentTypeComponentMap[item.type],
      }))

    // Copy original hit array so that we avoid modifying it
    const originalHits = [...hits]

    // For each content to be injected
    for (const item of itemsToInject) {
      // Default position to inject to, if "position" not specified
      if (item.type === 'salesCard') {
        item.position ??= 3
      }
      item.position ??= 7

      // Also make sure it has some ID to be used as a React map key
      item.objectID ??= `injected-content-${JSON.stringify(item)}`

      // Add it to the array
      originalHits.splice(item.position, 0, item)
    }

    // Inject items
    setInjectedHits(originalHits)
  }, [ruleData, hits, scopedResults, query])

  return (
    <div className="ais-InfiniteHits">
      <ul
        className={`ais-InfiniteHits-list ${
          mobile
            ? 'ais-InfiniteHits-list-mobile'
            : tablet
            ? 'ais-InfiniteHits-list-tablet'
            : ''
        }`}
      >
        {injectedHits.map((hit) => {
          // Wrap the hit info in an animation, and click functionality to view the product
          if (hit._component != undefined) {
            // If the hit has a component property, use it instead of the default component
            return (
              <li key={hit.objectID}>
                {hitsLoaded ? (
                  <hit._component hit={hit} />
                ) : (
                  <CustomSkeleton type="hit" />
                )}
              </li>
            )
          }
          return (
            <li key={hit.objectID}>
              {hitsLoaded ? (
                <Hit hit={hit} sendEvent={sendEvent} />
              ) : (
                <CustomSkeleton type="hit" />
              )}
            </li>
          )
        })}
        <li ref={productCard} aria-hidden="true" />
      </ul>
    </div>
  )
}

export default InjectedHits
