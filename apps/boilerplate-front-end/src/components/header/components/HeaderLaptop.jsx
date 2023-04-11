import { useEffect } from 'react'
// React Router
import { useNavigate } from 'react-router-dom'

// Recoil State
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import {
  navigationStateAtom,
  selectorNavigationRef,
} from '@/config/navigationConfig'

import {
  languageObjectSelectedAtom,
  languageSwitchConfig,
  languagesConfig,
} from '@/config/languagesConfig'
import {
  personaConfig,
  personaObjectSelectedAtom,
} from '@/config/personaConfig'
import {
  segmentConfig,
  segmentObjectSelectedAtom,
} from '@/config/segmentConfig'

import { cartClick, cartOpen, cartState } from '@/config/cartFunctions'

import useStoreCartToLocalStorage from '@/hooks/useStoreCartToLocalStorage'

// Import SearchBox config
import { searchBoxAtom, searchBoxIsActive } from '@/config/searchboxConfig'

//Import config for federatedSearch
import { shouldHaveOpenFederatedSearch } from '@/config/federatedConfig'

// Import voiceSearch config
import {
  shouldHaveCartFunctionality,
  shouldHaveLanguages,
  shouldHaveOktaLogin,
  shouldHavePersona,
  shouldHaveSegments,
} from '@/config/featuresConfig'

// Import applied rules config
import { rulesAtom } from '@/config/appliedRulesConfig'

// Custom Hooks
import useOutsideClick from '@/hooks/useOutsideClick'

import { AlgoliaLogo, CartPicto } from '@/assets/svg/SvgIndex'
import Selectors from '@/components/selector/Selectors'

// Import Components
import OktaAuthComponent from '@/components/header/components/OktaAuth'
import CustomSearchBox from '@/components/searchbox/SearchBox'
import { windowSize } from '@/hooks/useScreenSize'
import Navigation from './Navigation'

import QRCodeOpener from '@/components/qrCode/QRCodeOpener'
import { shouldHaveQRCode } from '@/config/featuresConfig'

import { mainIndex } from '@/config/algoliaEnvConfig'
import { currencySymbolAtom } from '@/config/currencyConfig'
import { linksHeader } from '@/config/navigationConfig'
import { useTranslation } from 'react-i18next'

const HeaderLaptop = ({ query, refine, clear }) => {
  // const { query, refine } = useSearchBox()
  const [searchboxRef, setSearchBoxRef] = useRecoilState(searchBoxAtom)
  const federated = useSetRecoilState(shouldHaveOpenFederatedSearch)
  const setSbIsActive = useSetRecoilState(searchBoxIsActive)
  const rulesApplied = useSetRecoilState(rulesAtom)
  const setNavigationState = useSetRecoilState(navigationStateAtom)
  const [cartOpenValue, setCartOpenValue] = useRecoilState(cartOpen)
  const [showCart, setShowCart] = useRecoilState(cartState)
  const cartIcon = useSetRecoilState(cartClick)

  const navigate = useNavigate()

  // Get references for dropdowns in Navigation
  const selectorsNavigation = useSetRecoilState(selectorNavigationRef)
  // Should show or not the sections
  const shouldShowPersonasAtom = useRecoilValue(shouldHavePersona)
  const shouldShowSegmentsAtom = useRecoilValue(shouldHaveSegments)
  const shouldShowLanguageSelected = useRecoilValue(shouldHaveLanguages)
  const shouldShowCartIcon = useRecoilValue(shouldHaveCartFunctionality)
  const shouldHaveLoginWithOkta = useRecoilValue(shouldHaveOktaLogin)
  // Should the alert badges for the demo guide be shown
  const shouldDisplayQRCodeGenerator = useRecoilValue(shouldHaveQRCode)

  const { mobile } = useRecoilValue(windowSize)

  useOutsideClick(searchboxRef, () => setSbIsActive(false))

  const [personaSelected, setPersonaSelected] = useRecoilState(
    personaObjectSelectedAtom
  )
  const [segmentSelected, setSegmentSelected] = useRecoilState(
    segmentObjectSelectedAtom
  )

  const [languageSelected, setLanguageSelected] = useRecoilState(
    languageObjectSelectedAtom
  )

  const setCurrency = useSetRecoilState(currencySymbolAtom)
  const index = useSetRecoilState(mainIndex)
  const navigationLinks = useSetRecoilState(linksHeader)
  const { i18n } = useTranslation()

  const handleChangeOfLanguage = (language) => {
    const code = language.code
    setLanguageSelected(language)
    index(languageSwitchConfig[code].index)
    setCurrency(languageSwitchConfig[code].currency)
    navigationLinks(languageSwitchConfig[code].linksHeader)
    i18n.changeLanguage(code.toLowerCase())
  }

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
        <div className="container__header-top-inner">
          <div className="title">
            <h3>Demo</h3>
          </div>
          <ul className="selector-list" ref={selectorsNavigation}>
            {shouldShowPersonasAtom && (
              <li>
                <Selectors
                  selectedValue={personaSelected}
                  setSelectedValue={setPersonaSelected}
                  options={personaConfig}
                />
              </li>
            )}
            {shouldShowSegmentsAtom && (
              <li>
                <Selectors
                  selectedValue={segmentSelected}
                  setSelectedValue={setSegmentSelected}
                  options={segmentConfig}
                />
              </li>
            )}
            {/* Display the language select component */}
            {shouldShowLanguageSelected && (
              <li>
                <Selectors
                  selectedValue={languageSelected}
                  setSelectedValue={handleChangeOfLanguage}
                  options={languagesConfig}
                />
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="container__header-mid">
        <div className="container__header-mid__logo">
          <a
            href="#"
            aria-label="link to home"
            onClick={(e) => {
              e.preventDefault()
              refine('')
              clear()
              setNavigationState({})
              federated(false)
              rulesApplied([])
              navigate('/')
            }}
          >
            <AlgoliaLogo />
          </a>
        </div>
        {/* For a search box Simple center */}
        <div className="searchbox-container" ref={setSearchBoxRef}>
          <CustomSearchBox query={query} refine={refine} clear={clear} />
          {/* {displayVoiceSearch && <CustomVoiceSearchComponent />} */}
        </div>
        <div className="container__header-right">
          {shouldShowCartIcon && (
            <div className="picto-cart">
              <button
                type="button"
                className={cartOpenValue ? 'picto-cart__active' : ''}
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
              </button>
              {/* )} */}
              {/* Picto notification up the cart icon */}
              {showCart?.length !== 0 && (
                <div className="notification-cart">
                  <span>{sumAllArticles(showCart)}</span>
                </div>
              )}
            </div>
          )}
          {shouldDisplayQRCodeGenerator && <QRCodeOpener />}
          {shouldHaveLoginWithOkta && <OktaAuthComponent />}
        </div>
      </div>
      <nav className="container__header-nav">
        <Navigation />
      </nav>
    </div>
  )
}

export default HeaderLaptop
