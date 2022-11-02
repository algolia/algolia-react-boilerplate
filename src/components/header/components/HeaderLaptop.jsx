import { useEffect } from 'react'
// React Router
import { Link } from 'react-router-dom'

// Recoil State
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import {
  navigationStateAtom,
  selectorNavigationRef,
} from '@/config/navigationConfig'

import { languagesConfig } from '@/config/languagesConfig'
import { personaConfig } from '@/config/personaConfig'
import { segmentConfig } from '@/config/segmentConfig'

import { cartClick, cartOpen, cartState } from '@/config/cartFunctions'

import useStoreCartToLocalStorage from '@/hooks/useStoreCartToLocalStorage'

// Import SearchBox config
import {
  queryAtom,
  searchBoxAtom,
  searchBoxIsActive,
} from '@/config/searchboxConfig'

//Import config for federatedSearch
import { shouldHaveOpenFederatedSearch } from '@/config/federatedConfig'

// Import voiceSearch config
import {
  shouldHaveCartFunctionality,
  shouldHaveLanguages,
  shouldHavePersona,
  shouldHaveSegments,
  shouldHaveVoiceSearch,
} from '@/config/featuresConfig'

// Import applied rules config
import { rulesAtom } from '@/config/appliedRulesConfig'

// Custom Hooks
import useOutsideClick from '@/hooks/useOutsideClick'

import { AlgoliaLogo, CartPicto } from '@/assets/svg/SvgIndex'
import { Selectors } from '../../selector/Selectors'

// Import Components
import CustomSearchBox from '@/components/searchbox/SearchBox'
import Navigation from './Navigation'
import { windowSize } from '@/hooks/useScreenSize'

const HeaderLaptop = () => {
  const [searchboxRef, setSearchBoxRef] = useRecoilState(searchBoxAtom)
  const setQueryState = useSetRecoilState(queryAtom)
  const federated = useSetRecoilState(shouldHaveOpenFederatedSearch)
  const setSbIsActive = useSetRecoilState(searchBoxIsActive)
  const displayVoiceSearch = useRecoilValue(shouldHaveVoiceSearch)
  const rulesApplied = useSetRecoilState(rulesAtom)
  const setNavigationState = useSetRecoilState(navigationStateAtom)
  const [cartOpenValue, setCartOpenValue] = useRecoilState(cartOpen)
  const [showCart, setShowCart] = useRecoilState(cartState)
  const cartIcon = useSetRecoilState(cartClick)

  // Get references for dropdowns in Navigation
  const selectorsNavigation = useSetRecoilState(selectorNavigationRef)
  // Should show or not the sections
  const shouldShowPersonasAtom = useRecoilValue(shouldHavePersona)
  const shouldShowSegmentsAtom = useRecoilValue(shouldHaveSegments)
  const shouldShowLanguageSelected = useRecoilValue(shouldHaveLanguages)
  const shouldShowCartIcon = useRecoilValue(shouldHaveCartFunctionality)

  const { mobile, isDesktop } = useRecoilValue(windowSize)

  useOutsideClick(searchboxRef, () => setSbIsActive(false))

  // UseEffect to store into the local storage our Cart
  useEffect(() => {
    if (showCart?.length > 0) {
      localStorage.removeItem('myCart')
      useStoreCartToLocalStorage(showCart)
    }
  }, [showCart])

  // If there is already a Cart in the local storage, then store it in recoile state
  useEffect(() => {
    const getCart = localStorage.getItem('myCart')
    if (getCart) {
      const cleanCart = JSON.parse(getCart)
      const savedCart = cleanCart[cleanCart?.length - 1]
      setShowCart(savedCart)
    }
  }, [])

  const sumAllArticles = (cart) => {
    let x = 0
    cart.map((i, index) => {
      x += i.qty
    })
    return x
  }

  return (
    <div className="container">
      <div className="container__header-top">
        <div className="title">
          <h3>Demo</h3>
        </div>
        <ul className="selector-list" ref={selectorsNavigation}>
          {shouldShowPersonasAtom && (
            <li>
              <Selectors props={personaConfig} />
            </li>
          )}
          {shouldShowSegmentsAtom && (
            <li>
              <Selectors props={segmentConfig} />
            </li>
          )}
          {/* Display the language select component */}
          {shouldShowLanguageSelected && (
            <li>
              <Selectors props={languagesConfig} />
            </li>
          )}
        </ul>
      </div>
      <div className="container__header-mid">
        <div className="container__header-mid__logo">
          <Link
            to="/"
            aria-label="link to home"
            onClick={() => {
              setQueryState('')
              setNavigationState({})
              federated(false)
              rulesApplied([])
            }}
          >
            <AlgoliaLogo />
          </Link>
        </div>
        {/* For a search box Simple center */}
        <div className="searchbox-container" ref={setSearchBoxRef}>
          <CustomSearchBox />
          {/* {displayVoiceSearch && <CustomVoiceSearchComponent />} */}
        </div>

        {shouldShowCartIcon && (
          <div className="picto-cart">
            {/* {!isDesktop ? (
              <p
                onClick={(e) => {
                  e.stopPropagation()
                  setCartOpenValue(!cartOpenValue)
                  {
                    mobile && setIsMenuOpen(false)
                  }
                }}
              >
                Cart
              </p>
            ) : ( */}
            <div
              className={cartOpenValue && 'picto-cart__active'}
              ref={cartIcon}
              onClick={(e) => {
                e.stopPropagation()
                setCartOpenValue(!cartOpenValue)
                {
                  mobile && setIsMenuOpen(false)
                }
              }}
            >
              <CartPicto />
            </div>
            {/* )} */}
            {/* Picto notification up the cart icon */}
            {showCart?.length !== 0 && (
              <div className="notification-cart">
                <span>{sumAllArticles(showCart)}</span>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="container__header-nav">
        <Navigation />
      </div>
    </div>
  )
}

export default HeaderLaptop
