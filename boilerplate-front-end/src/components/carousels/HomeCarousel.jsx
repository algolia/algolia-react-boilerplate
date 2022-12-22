import { useEffect, useRef, useState } from 'react'

import { motion } from 'framer-motion'
import { Configure, Index, useHits } from 'react-instantsearch-hooks-web'

// Recoil
import { useRecoilValue, useSetRecoilState } from 'recoil'

// Import configuration
import { mainIndex } from '@/config/algoliaEnvConfig'
import { hitsPerCarousel, isCarouselLoaded } from '@/config/carouselConfig'
import { personaObjectSelectedAtom } from '@/config/personaConfig'
import { segmentObjectSelectedAtom } from '@/config/segmentConfig'

//Import scope SCSS
import SkeletonLoader from '../hits/components/HitsSkeletonLoader'
import './SCSS/carousels.scss'

// Import cart from recoil
import {
  ChevronLeftCarousel,
  ChevronRightCarousel,
} from '@/assets/svg/SvgIndex'
import HitsCarousel from './HitsCarousel'

// Build the Carousel for use on the Homepage
const HomeCarousel = ({ context, title }) => {
  const index = useRecoilValue(mainIndex)
  const persona = useRecoilValue(personaObjectSelectedAtom)
  const segment = useRecoilValue(segmentObjectSelectedAtom)
  const setCarouselLoaded = useSetRecoilState(isCarouselLoaded)

  useEffect(() => setCarouselLoaded(true), [])

  return (
    <div className="home-carousel">
      <Index indexId={title} indexName={index}>
        <Configure
          hitsPerPage={hitsPerCarousel}
          ruleContexts={context}
          optionalFilters={segment.value}
          userToken={persona.value}
          query={''}
        />
        <Carousel title={title} />
      </Index>
    </div>
  )
}

// This carousel is used inside of HomeCarousel

function Carousel(props) {
  const { hits, sendEvent } = useHits(props)
  const { title } = props
  // const [width, setWidth] = useState(0)
  const [containerCarouselWidth, setContainerCarouselWidth] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  // Get the main index
  const index = useRecoilValue(mainIndex)

  const carousel = useRef()
  const innerCarousel = useRef()

  useEffect(() => {
    if (!isLoading) {
      setContainerCarouselWidth(
        carousel.current.scrollWidth - carousel.current.offsetWidth
      )
    }
  }, [innerCarousel])

  useEffect(() => {
    if (hits.length > 0) setIsLoading(false)
  }, [hits])

  return (
    <>
      <h3 className="title">{title}</h3>
      {/* This div declares the outer reference for the framer motion */}
      {isLoading ? (
        <SkeletonLoader type="carousel" />
      ) : (
        <motion.div ref={carousel} className="carousel">
          <div
            className="prevBtn"
            onClick={() => {
              innerCarousel.current.scrollLeft = 0
            }}
          >
            <ChevronLeftCarousel />
          </div>
          <motion.div className="inner-carousel" ref={innerCarousel}>
            {/* Display the hits in the carousel */}
            {hits.map((hit, i) => {
              return (
                <HitsCarousel
                  hit={hit}
                  key={i}
                  index={index}
                  sendEvent={sendEvent}
                />
              )
            })}
          </motion.div>
          <div
            className="nextBtn"
            onClick={() => {
              innerCarousel.current.scrollLeft =
                innerCarousel.current.scrollWidth
            }}
          >
            <ChevronRightCarousel />
          </div>
        </motion.div>
      )}
    </>
  )
}

export default HomeCarousel
