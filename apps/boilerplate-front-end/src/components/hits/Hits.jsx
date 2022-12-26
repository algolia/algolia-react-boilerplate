import { useEffect, useState } from 'react'

// Import framer-motion for animation on hits
import { AnimatePresence, motion } from 'framer-motion'

import { Highlight } from 'react-instantsearch-hooks-web'
// Import SVGs
import { CartPicto, Heart, InfoPicto } from '@/assets/svg/SvgIndex'
import RankingIcon from './components/RankingIcon'

// Import Badge config
import { badgeCriteria } from '@/config/badgeConfig'

// Lodash function to acces to precise attribute
import get from 'lodash/get'
// Animations
import { framerMotionHits } from '@/config/animationConfig'

// Recoil import
import { hitAtom, hitsConfig } from '@/config/hitsConfig'
import { useRecoilValue, useSetRecoilState } from 'recoil'

// React-router import
import { useNavigate } from 'react-router-dom'
import Badge from './components/Badge'

//Import hook for store ID into local storage
import useStoreIdToLocalStorage from '@/hooks/useStoreObjectIdToLocalStorage'

// import Price component
import Price from '@/components/hits/components/Price.jsx'

// Import cart from recoil(Cart state and the event if it's removed)
import { addToCartSelector, cartClick, cartState } from '@/config/cartFunctions'
// Import Persona if there is
import {
  shouldHaveCartFunctionality,
  shouldHavePersona,
} from '@/config/featuresConfig'
import {
  personaObjectSelectedAtom,
  shouldDisplayRankingIcons,
} from '@/config/personaConfig'

//Import scope SCSS
import './SCSS/hits.scss'

const Hit = ({ hit, sendEvent }) => {
  const navigate = useNavigate()
  const hitState = useSetRecoilState(hitAtom)
  const [isHovered, setIsHovered] = useState(false)
  // Qty state
  const [itemQty, setItemQty] = useState(0)

  const setCartIcon = useSetRecoilState(cartClick)

  // Import Cart State
  const cart = useRecoilValue(cartState)
  const setAddToCartAtom = useSetRecoilState(addToCartSelector)
  const showPersona = useRecoilValue(shouldHavePersona)
  const showRankingIcons = useRecoilValue(shouldDisplayRankingIcons)
  const persona = useRecoilValue(personaObjectSelectedAtom)

  const shouldShowCartIcons = useRecoilValue(shouldHaveCartFunctionality)

  const [cartLogoClicked, setCartLogoClicked] = useState(false)

  // Get hit attribute from config file
  const { objectID, image, imageAlt, category, productName, brand } = hitsConfig

  const [shouldShowRankingInfo, setShouldShowRankingInfo] = useState(false)

  const RankingFormulaOverlay = ({ hit }) => {
    return (
      <motion.div
        variants={framerMotionHits}
        initial={framerMotionHits.initial}
        exit={framerMotionHits.exit}
        animate={framerMotionHits.animate}
        transition={{
          duration: 0.3,
          delay: 0,
          ease: [0.43, 0.13, 0.23, 0.96],
        }}
        className="ranking-formula"
      >
        {hit._rankingInfo &&
          Object.entries(hit._rankingInfo).map((entry, i) => (
            <p key={i}>
              {entry[0]} {JSON.stringify(entry[1])}
            </p>
          ))}
      </motion.div>
    )
  }

  const promoted = hit?._rankingInfo?.promoted
  // Update the qty for a product on SRP each time Cart is modified or set qty to 0
  const updateQty = (article) => {
    if (!cart.length) setItemQty(0)
    const productAddedInCart = cart.find(
      (element) => element.objectID === article.objectID
    )
    productAddedInCart ? setItemQty(productAddedInCart.qty) : setItemQty(0)
  }

  // Update the qty for a product on SRP each time Cart is modified
  useEffect(() => {
    updateQty(hit)
  }, [cart])

  return (
    <motion.div
      layout
      variants={framerMotionHits}
      initial={framerMotionHits.initial}
      exit={framerMotionHits.exit}
      animate={framerMotionHits.animate}
      transition={framerMotionHits.transition}
      className={`${promoted ? 'promotedItems' : ''} srpItem`}
    >
      {showPersona && showRankingIcons && <RankingIcon {...{ hit }} />}
      <div
        className="button-ranking-container"
        onClick={() => setShouldShowRankingInfo(!shouldShowRankingInfo)}
      >
        <button className="ranking-formula-button" aria-label="show ranking">
          <InfoPicto />
        </button>
        <p>Click to see Ranking</p>
      </div>
      <AnimatePresence>
        {shouldShowRankingInfo && <RankingFormulaOverlay hit={hit} />}
      </AnimatePresence>
      <>
        <div
          className="srpItem__imgWrapper"
          onMouseLeave={(e) => {
            setIsHovered(false)
          }}
          onMouseOver={(e) => {
            !shouldShowRankingInfo && setIsHovered(true)
          }}
          onClick={() => {
            hitState(hit)
            navigate(`/search/product/${hit[objectID]}`)
            useStoreIdToLocalStorage(hit[objectID])
            sendEvent('click', hit, 'SRP: Product clicked')
          }}
        >
          <img
            className={
              shouldShowRankingInfo ? 'mainImage-opacity' : 'mainImage-visible'
            }
            loading="lazy"
            src={
              isHovered && get(hit, imageAlt) !== undefined
                ? get(hit, imageAlt)
                : get(hit, image)
            }
            key={2}
            alt={get(hit, category)}
            onError={(e) => (e.currentTarget.src = placeHolderError)}
          />
          {/* )} */}
          {badgeCriteria(hit) !== null && !shouldShowRankingInfo && (
            <Badge title={badgeCriteria(hit)} />
          )}
          <div className="srpItem__imgWrapper__heart">
            {(persona.personalizationFilters.length < 1 ||
              !showPersona ||
              !showRankingIcons) && <Heart />}
          </div>
        </div>
        <div className="srpItem__infos">
          <div className="srpItem__infosUp">
            <p className="brand">{get(hit, brand)}</p>
            <h3 className="productName">
              <Highlight hit={hit} attribute={productName} />
            </h3>
          </div>
          <div className="srpItem__infosDown">
            <p className="price">
              <Price hit={hit} />
            </p>
            {shouldShowCartIcons && (
              <div
                className={cartLogoClicked ? 'cart cart-active' : 'cart'}
                ref={setCartIcon}
                onClick={(e) => {
                  e.stopPropagation()
                  setCartLogoClicked(true)
                  setTimeout(() => setCartLogoClicked(false), 300)
                  setAddToCartAtom(hit)
                  sendEvent('conversion', hit, 'Homepage: Add to cart')
                  // setCartOpenValue(true)
                }}
              >
                <CartPicto />
              </div>
            )}
          </div>
        </div>
      </>
    </motion.div>
  )
}

export { Hit }

// KEEP IT FOR NOW
{
  /* {shouldShowCartIcons && (
<div className="srpItem__infosDown__cart">
  <div
    className={`${
      itemQty === 0 && 'srpItem__infosDown__minusPicto-inactive '
    }${cartPictoMinusClicked && 'picto-active'}`}
    onClick={() => {
      setCartPictoMinusClicked(true)
      setTimeout(() => setCartPictoMinusClicked(false), 300)
      setRemoveToCartAtom(hit)
    }}
  >
    <MinusPicto />
  </div>
  <p
    className={
      itemQty === 0 ? 'srpItem__infosDown__cart-inactive' : ''
    }
  >
    {itemQty}
  </p>
  <div
    className={
      cartPictoPlusClicked
        ? 'picto-active srpItem__infosDown__cart-plus'
        : 'srpItem__infosDown__cart-plus'
    }
    onClick={() => {
      setCartPictoPlusClicked(true)
      setTimeout(() => setCartPictoPlusClicked(false), 300)
      setAddToCartAtom(hit)
      // Send event conversion to Algolia API
      sendEvent('conversion', hit, 'SRP: Add to cart')
    }}
  >
    <PlusPicto />
  </div>
</div>
)} */
}
