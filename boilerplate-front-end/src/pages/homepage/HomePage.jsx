// This is the homepage, which you see when you first visit the site.
// By default it contains some banners and carousels
import { lazy, Suspense, useRef, useState } from 'react'

// Fetch values from state
import { useRecoilValue } from 'recoil'

// Framer motion
import { AnimatePresence } from 'framer-motion'

//Use Translation
import { useTranslation } from 'react-i18next'

// Import screenShot/ images for the homepage
import homepage_1 from '@/assets/homepage/homepage_1.webp'
import homepage_2 from '@/assets/homepage/homepage_2.webp'

// should carousel be shown or not and config for carousel
import { carouselConfig, isCarouselLoaded } from '@/config/carouselConfig'

import CustomHomeBanners from '@/components/banners/HomeBanners'
import CustomSkeleton from '@/components/skeletons/CustomSkeleton'

//  should federated search be shown or not
import {
  shouldHaveCarousels,
  shouldHaveFederatedSearch,
  shouldHaveTrendingProducts,
} from '@/config/featuresConfig'
import { shouldHaveOpenFederatedSearch } from '@/config/federatedConfig'

import { windowSize } from '@/hooks/useScreenSize'

const FederatedSearch = lazy(() =>
  import('@/components/federatedSearch/FederatedSearch')
)

const HomeCarousel = lazy(() => import('@/components/carousels/HomeCarousel'))

const Trending = lazy(() =>
  import('@/components/recommend/trending/TrendingProducts')
)
// Import scoped SCSS
import './homepage.scss'

const HomePage = ({ query, refine }) => {
  const carouselLoaded = useRecoilValue(isCarouselLoaded)

  const [isHomepage1Loaded, setHomepage1Loaded] = useState(false)
  const [isHomepage2Loaded, setHomepage2Loaded] = useState(false)

  // Boolean value which determines if federated search is shown or not, default is false
  const isFederated = useRecoilValue(shouldHaveFederatedSearch)
  const isCarousel = useRecoilValue(shouldHaveCarousels)
  const isFederatedOpen = useRecoilValue(shouldHaveOpenFederatedSearch)
  const HomePage = useRef(false)

  // Boolean value which determines if federated search is shown or not, default is false
  const shouldHaveTrendingProductsValue = useRecoilValue(
    shouldHaveTrendingProducts
  )

  const { mobile } = useRecoilValue(windowSize)

  // Import and use translation
  const { t } = useTranslation('translation', {
    keyPrefix: 'homePage',
  })

  return (
    // Framer motion wrapper
    <div className="homepage" ref={HomePage}>
      {isFederated && isFederatedOpen && (
        <Suspense>
          <AnimatePresence>
            <FederatedSearch query={query} refine={refine} />
          </AnimatePresence>
        </Suspense>
      )}

      {/* Load custom banners */}
      <CustomHomeBanners />

      {isCarousel &&
        carouselConfig.map((carousel, i) => (
          <HomeCarousel
            key={i}
            context={carousel.context}
            title={t('titleCarousels')[i]}
          />
        ))}

      {/* Render Recommend component - Trending Products Slider */}
      {/* Change header and maxRecommendations in /config/trendingConfig.js */}
      {carouselLoaded && (
        <div className="recommend">
          {shouldHaveTrendingProductsValue && (
            <Suspense>
              <Trending filter={null} />
            </Suspense>
          )}
        </div>
      )}

      {/* Here if homepage image needs to be added to the demo */}

      {/* {homepage_1 && carouselLoaded && (
        <div className="homepage__imageWrapper">
          {isHomepage1Loaded === false && <CustomSkeleton type="banner" />}
          <img
            src={homepage_1}
            alt="homepage1"
            width={mobile ? '400' : '3014'}
            height={mobile ? '202' : '1324'}
            onLoad={() => setHomepage1Loaded(true)}
          />
        </div>
      )} */}
    </div>
  )
}

export default HomePage
