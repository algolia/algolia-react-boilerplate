// This is in the Search Results Page for both laptop and mobile windows

// Import InstantSearch Functionality
import { useEffect, useRef, useState } from 'react'

import { windowSize } from '@/hooks/useScreenSize'
import { useRecoilValue } from 'recoil'

import CustomSkeleton from '@/components/skeletons/CustomSkeleton'
import { Hit } from '../Hits'

function CustomHits(props) {
  const { hits, isLastPage, showMore, sendEvent } = props
  const { mobile, tablet } = useRecoilValue(windowSize)
  const [hitsLoaded, setHitsLoaded] = useState(true)
  const productCard = useRef(null)

  useEffect(() => {
    if (hits.length > 0) {
      setHitsLoaded(true)
    }
  }, [hits])

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
        {hits.map((hit) => {
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
          // Note: it's not good practice to use the item index as key, because that may cause the renderer
          // to think 2 different products are one and the same in case they change positions
        })}
        <li ref={productCard} aria-hidden="true" />
      </ul>
    </div>
  )
}

export default CustomHits

// OBS: hits may be provided through props, for example, so that we can provided hits with injected content!
