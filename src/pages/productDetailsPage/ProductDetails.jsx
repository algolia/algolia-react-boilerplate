// Page for Product details, after clicking on an item from search
// It contains both Recommend components
import { useEffect, useState } from 'react'

// Recommend
import {
  useFrequentlyBoughtTogether,
  useRelatedProducts,
} from '@algolia/recommend-react'

// Slider for recommend
import { HorizontalSlider } from '@algolia/ui-components-horizontal-slider-react'

// styles for Recommend HorizontalSlider
import '@algolia/ui-components-horizontal-slider-theme'

// framer-motion
import { motion } from 'framer-motion'
// Import Lodash functions
import get from 'lodash/get'
// React Router
import { useLocation, useNavigate } from 'react-router-dom'
// State Manage Recoil
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

// SVG & components
import { CartPicto, ChevronLeft } from '@/assets/svg/SvgIndex'
import Price from '@/components/hits/components/Price.jsx'
import RelatedItem from '@/components/recommend/relatedItems/RelatedProducts'

// Configuration
import {
  mainIndex,
  recommendClient,
  searchClient,
} from '@/config/algoliaEnvConfig'
import {
  framerMotionPage,
  framerMotionTransition,
} from '@/config/animationConfig'
import { addToCartSelector, cartOpen } from '@/config/cartFunctions'
import {
  shouldHaveFbtProducts,
  shouldHaveRelatedProducts,
} from '@/config/featuresConfig'
import { shouldHaveOpenFederatedSearch } from '@/config/federatedConfig'
import { hitAtom, hitsConfig, PDPHitSections } from '@/config/hitsConfig'

// Custom hooks
import { windowSize } from '@/hooks/useScreenSize'

//Import scope SCSS
import './SCSS/productDetails.scss'

// Import and use translation
import FbtAddAll from '@/components/fbtPdp/FbtAddAll'
import FbtItems from '@/components/recommend/fbtItems/FbtProducts'
import { useTranslation } from 'react-i18next'

const ProductDetails = () => {
  const [addToCartIsClicked, setAddToCartIsClicked] = useState(false)

  // location in order to access current objectID
  const location = useLocation()

  // access the main index from recoil state
  const indexName = useRecoilValue(mainIndex)

  // access the hit component from recoil state
  const [hit, setHit] = useRecoilState(hitAtom)

  const [cartOpenValue, setCartOpenValue] = useRecoilState(cartOpen)

  const [readyToLoad, setReadyToLoad] = useState(false)

  // current Object ID from URL
  const currentObjectID = location.pathname.split('/')[3]

  // if there is no stored hit
  useEffect(() => {
    if (Object.keys(hit).length === 0) {
      // initialise the API client
      const index = searchClient.initIndex(indexName)

      // Find the hit by Object ID through Algolia
      index
        .search('', { facetFilters: `objectID:${currentObjectID}` })
        .then(({ hits }) => {
          if (hits.length && hits.length > 0) {
            // Set the hit atom
            setHit(hits[0])
            setReadyToLoad(true)
          }
        })
    } else {
      setReadyToLoad(true)
    }
  }, [])

  const shouldHaveRelatedProductsValue = useRecoilValue(
    shouldHaveRelatedProducts
  )

  const shouldHaveFbtProductsValue = useRecoilValue(shouldHaveFbtProducts)

  // Close federated and set value false for return without it
  const setFederatedOpen = useSetRecoilState(shouldHaveOpenFederatedSearch)

  useEffect(() => {
    setFederatedOpen(false)
  }, [])

  // navigate is used by react router
  const navigate = useNavigate()

  const { isDesktop } = useRecoilValue(windowSize)

  const setAddToCartAtom = useSetRecoilState(addToCartSelector)
  const cartState = useRecoilValue(addToCartSelector)

  // Fetch and compute the current total value of the users cart
  const [currentCartTotal, setCurrentCartTotal] = useState(
    cartState.reduce((acc, val) => (acc += val.unformated_price), 0)
  )

  // Adjust the current total when the state of the cart changes
  useEffect(() => {
    setCurrentCartTotal(
      cartState.reduce((acc, val) => (acc += val.unformated_price), 0)
    )
  }, [cartState])

  // Get hit attribute from config file
  const { image, productName, brand, sizeFilter, colour, colourHexa } =
    hitsConfig

  const hexaCode = get(hit, colourHexa)?.split(';')[1]

  // Import const translation
  // Use the translator
  const { t } = useTranslation('translation', {
    keyPrefix: 'pdp',
  })

  let fbtRecommendationsProducts
  let relatedRecommendationsProducts
  let totalFbtProductsAmount

  if (shouldHaveFbtProductsValue) {
    const { recommendations } = useFrequentlyBoughtTogether({
      recommendClient,
      indexName,
      objectIDs: [currentObjectID],
      maxRecommendations: 2,
    })

    // Add the original product from the PDP at the start of the recommendations
    fbtRecommendationsProducts =
      recommendations.length > 0 ? [hit, ...recommendations] : recommendations

    // Compute the total if all recommendations purchased, used for predict in addAllFbt component
    totalFbtProductsAmount = fbtRecommendationsProducts.reduce(
      (acc, val) => (acc += val.unformated_price),
      0
    )
  }

  if (shouldHaveRelatedProductsValue) {
    const { recommendations } = useRelatedProducts({
      recommendClient,
      indexName,
      objectIDs: [currentObjectID],
    })
    relatedRecommendationsProducts = recommendations
  }

  return (
    // Product Display Page parent container, including attributes for framer motion
    <div
      className={`${!isDesktop ? 'pdp-mobile' : ''} pdp`}
      variants={framerMotionPage}
      initial={framerMotionPage.initial}
      animate={framerMotionPage.animate}
      exit={framerMotionPage.exit}
      transition={framerMotionPage.transition}
    >
      <div className={`${!isDesktop ? 'pdp-mobile__wrapper' : 'pdp__wrapper'}`}>
        <div
          className={`${!isDesktop ? 'pdp-mobile__backBtn' : 'pdp__backBtn'}`}
          onClick={() => {
            navigate('/search')
          }}
        >
          <ChevronLeft />
          <p>{t('buttonBack')}</p>
        </div>
        <div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
            transition: { framerMotionTransition },
          }}
          className={`${!isDesktop ? 'pdp-mobile__left' : 'pdp__left'}`}
        >
          <div
            className="container"
            initial={{
              height: '100%',
              opacity: 0,
            }}
            animate={{
              x: 0,
              width: '100%',
              opacity: 1,
              transition: { delay: 0.2, framerMotionTransition },
            }}
          >
            <div className="imageWrapper">
              <motion.img
                whileHover={{ scale: 1.05 }}
                transition={framerMotionTransition}
                src={get(hit, image)}
                alt=""
                onError={(e) => (e.currentTarget.src = placeHolderError)}
              />
            </div>
          </div>
        </div>
        <div className={`${!isDesktop ? 'pdp-mobile__right' : 'pdp__right'}`}>
          <div
            className="pdp__right__infos"
            initial={{
              opacity: 0,
            }}
            animate={{
              x: 0,
              opacity: 1,
              transition: { delay: 0.5, framerMotionTransition },
            }}
          >
            {PDPHitSections.brand && <p className="brand">{get(hit, brand)}</p>}
            {PDPHitSections.productName && (
              <p className="name">{get(hit, productName)}</p>
            )}
            {PDPHitSections.colour && (
              <div className="color">
                {hexaCode ? (
                  <div
                    style={{
                      backgroundColor: hexaCode,
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                    }}
                  ></div>
                ) : (
                  ''
                )}
                <p>{get(hit, colour)}</p>
              </div>
            )}

            {PDPHitSections.sizeFilter && get(hit, sizeFilter)?.length > 0 && (
              <div className="sizes">
                <p>{t('availableSize')}</p>
                <div className="sizeList">
                  {get(hit, sizeFilter).map((size, i) => (
                    <div className="size" key={i}>
                      <p>{size}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* Add to cart button which sends an Insights API call to Algolia but only if there is no size filter */}

            {PDPHitSections.price && (
              <motion.p
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                  transition: { delay: 1, framerMotionTransition },
                }}
                className="price"
              >
                <Price hit={hit} />
              </motion.p>
            )}
            {!PDPHitSections.sizeFilter && (
              <button
                className={
                  addToCartIsClicked
                    ? 'add-to-cart add-to-cart-active'
                    : 'add-to-cart'
                }
                onClick={(e) => {
                  e.stopPropagation()
                  setAddToCartAtom(hit)
                  setAddToCartIsClicked(true)
                  setCartOpenValue(!cartOpenValue)
                  setTimeout(() => setAddToCartIsClicked(false), 300)
                  // Send event conversion to Algolia API
                  // sendEvent('conversion', hit, 'PDP: Add to cart')
                }}
              >
                <CartPicto />
                <p>{t('addToCartButton')}</p>
              </button>
            )}
          </div>
        </div>
      </div>
      {/* Render two Recommend components - Related Products, Frequently Bought Together */}
      {readyToLoad && (
        <div
          className="recommend"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
            transition: { delay: 1, framerMotionTransition },
          }}
        >
          {shouldHaveRelatedProductsValue &&
            relatedRecommendationsProducts.length > 0 && (
              <div>
                <h3 className="title">{t('relatedTitle')}</h3>
                <HorizontalSlider
                  itemComponent={RelatedItem}
                  items={relatedRecommendationsProducts}
                />
              </div>
            )}
          {shouldHaveFbtProductsValue && fbtRecommendationsProducts.length > 1 && (
            <div className="fbt-outer-container">
              <h3 className="title">{t('fbtTitle')}</h3>
              <div
                className={`${
                  !isDesktop ? 'fbt-container-mobile' : 'fbt-container'
                }`}
              >
                <div className="fbt-container__component">
                  {fbtRecommendationsProducts.map((item, i) => {
                    return <FbtItems item={item} index={i} key={i} />
                  })}
                </div>
                <FbtAddAll
                  totalFbtProductsAmount={totalFbtProductsAmount}
                  currentCartTotal={currentCartTotal}
                  items={fbtRecommendationsProducts.slice(0, 3)}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default ProductDetails
