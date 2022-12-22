import { useEffect, useRef, useState } from 'react'

// React Router
import { Link } from 'react-router-dom'

// Recoil Header State
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import { motion } from 'framer-motion'

import { shouldHaveOpenFederatedSearch } from '@/config/federatedConfig'

//import Navigation config
import { navigationStateAtom } from '@/config/navigationConfig'

// Import Rules config
import { rulesAtom } from '@/config/appliedRulesConfig'

// Import framer motion
import { AnimatePresence } from 'framer-motion'

// Import SearchBox
// eslint-disable-next-line import/order
import CustomSearchBox from '@/components/searchbox/SearchBox'
import CustomVoiceSearchComponent from '@/components/voicesearch/VoiceSearch'

import Navigation from './Navigation'

// Custom hook to prevent body from scrolling
import { AlgoliaLogoMobile, CartPicto } from '@/assets/svg/SvgIndex'
import {
  cartClick,
  cartOpen,
  cartState,
  clickHamburger,
} from '@/config/cartFunctions'
import {
  shouldHaveCartFunctionality,
  shouldHaveVoiceSearch,
} from '@/config/featuresConfig'
import useOutsideClick from '@/hooks/useOutsideClick'
import usePreventScrolling from '@/hooks/usePreventScrolling'
import { useSearchBox } from 'react-instantsearch-hooks-web'

const HeaderMobile = ({ mobile, tablet }) => {
  const { query, refine } = useSearchBox()
  // Import configuration from Recoil
  const federated = useSetRecoilState(shouldHaveOpenFederatedSearch)

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const displayVoiceSearch = useRecoilValue(shouldHaveVoiceSearch)

  const hamburger = useSetRecoilState(clickHamburger)

  const setNavigationState = useSetRecoilState(navigationStateAtom)

  const rulesApplied = useSetRecoilState(rulesAtom)

  // CART
  const shouldShowCartIcon = useRecoilValue(shouldHaveCartFunctionality)
  const [cartOpenValue, setCartOpenValue] = useRecoilState(cartOpen)
  const cartIcon = useSetRecoilState(cartClick)
  const [showCart, setShowCart] = useRecoilState(cartState)

  const sumAllArticles = (cart) => {
    let x = 0
    cart.map((i, index) => {
      x += i.qty
    })
    return x
  }

  // Prevent body from scrolling when panel is open
  usePreventScrolling(isMenuOpen)

  return (
    <div className="container container-mobile">
      <div className="container__header-mid">
        {/* Hamburger button to open or close the menu dropdown */}
        <div
          className={`${
            isMenuOpen ? 'hamburger-active' : 'hamburger-inactive'
          } hamburger`}
          onClick={() => {
            setIsMenuOpen(!isMenuOpen)
          }}
        >
          <span ref={hamburger} className="hamburger__line"></span>
          <span className="hamburger__line"></span>
          <span className="hamburger__line"></span>
        </div>
        {/* Logo, which returns to the homepage on click */}
        <div className="container__header-mid__logo">
          <Link
            to="/"
            aria-label="Back to homepage"
            onClick={() => {
              if (query !== '') refine('')
              setNavigationState({})
              federated(false)
              rulesApplied([])
            }}
          >
            <AlgoliaLogoMobile />
          </Link>
        </div>
        {/* For a search box Simple center */}
        {shouldShowCartIcon && (
          <div
            className={
              cartOpenValue ? 'picto-cart picto-cart__active' : 'picto-cart'
            }
            onClick={(e) => {
              e.stopPropagation()
              setCartOpenValue(!cartOpenValue)
              {
                mobile && setIsMenuOpen(false)
              }
            }}
            ref={cartIcon}
          >
            <CartPicto />
            {/* Picto notification up the cart icon */}
            {showCart?.length !== 0 && (
              <div className="notification-cart">
                <span>{sumAllArticles(showCart)}</span>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="searchbox-container searchbox-container-mobile">
        <CustomSearchBox />
        {/* Display voicesearch if the  displayVoiceSearch config is set to true */}
        {displayVoiceSearch && <CustomVoiceSearchComponent />}
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <div className="container-mobile__navigation-wp">
            <CategoriesMobile
              isMenuOpen={isMenuOpen}
              setIsMenuOpen={setIsMenuOpen}
              mobile={mobile}
              tablet={tablet}
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

const CategoriesMobile = ({ isMenuOpen, setIsMenuOpen, mobile, tablet }) => {
  const navigationMobile = useRef(null)
  const [navigationComponentRef, setNavigationComponentRef] = useState(null)

  useEffect(() => {
    setNavigationComponentRef(navigationMobile.current)
  }, [])
  useOutsideClick(navigationComponentRef, () => setIsMenuOpen(false))

  return (
    <motion.div
      ref={navigationMobile}
      className="container-mobile__navList"
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -200 }}
    >
      <Navigation
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        mobile={mobile}
        tablet={tablet}
      />
    </motion.div>
  )
}

export default HeaderMobile
