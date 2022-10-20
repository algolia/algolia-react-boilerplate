// This SearchBox is with a magnifying glass inside
// but simple it means with only a glass simple effect

import { memo, useEffect, useState } from 'react'

// Algolia Import
import { useSearchBox } from 'react-instantsearch-hooks-web'

// Import navigate function to route to results page on search submit
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

// Import Recoil
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

// Import SVG from file as a component
import { Glass, SimpleCloseButton, SubmitPicto } from '@/assets/svg/SvgIndex'
import SearchInCategory from './components/SearchInCategory'

import { rulesAtom } from '@/config/appliedRulesConfig'
import {
  isSearchInCategory,
  queryAtom,
  searchBoxIsActive,
} from '@/config/searchboxConfig'

import { navigationStateAtom } from '@/config/navigationConfig'

import { shouldHaveOpenFederatedSearch } from '@/config/federatedConfig'

//Use Translation
import { useTranslation } from 'react-i18next'

// Custom Hooks
import useStoreQueryToLocalStorage from '@/hooks/useStoreStringToLocalStorage'

//Import scope SCSS
import './SCSS/searchbox.scss'

function CustomSearchBox(props) {
  const navigationState = useRecoilValue(navigationStateAtom)
  // Handle URL search parameters through React Router
  let [searchParams, setSearchParams] = useSearchParams()

  const [hasKeystroke, setHasKeystroke] = useState(false)

  const { query, refine } = useSearchBox(props)

  // Recoil State
  const [queryState, setQueryState] = useRecoilState(queryAtom)

  const [sbIsActive, setSbIsActive] = useRecoilState(searchBoxIsActive)

  const [tooltip, setTooltip] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  // const setSearchBoxRef = useSetRecoilState(searchBoxAtom);
  const setIsFederatedOpen = useSetRecoilState(shouldHaveOpenFederatedSearch)

  // router hook to navigate using a function
  const navigate = useNavigate()
  // Get states of React Router
  const { state, pathname } = useLocation()

  // Get array of rules from Recoil
  const rulesApplied = useSetRecoilState(rulesAtom)

  // Import and use translation
  const { t } = useTranslation('translation', {
    keyPrefix: 'searchBox',
  })

  const refineFunction = (query) => {
    // Refine query in all the app through recoil
    setQueryState(query)
    // Empty array of rules on each Keystrokes
    rulesApplied([])
    searchParams.set('query', query)
    setSearchParams(searchParams)
  }

  useEffect(() => {
    queryState === '' ? setHasKeystroke(false) : setHasKeystroke(true)
  }, [queryState])

  return (
    <div
      className={`searchbox ${sbIsActive ? 'searchbox-active' : ''} ${
        state && isSearchInCategory ? 'searchbox-category' : ''
      }`}
    >
      <form
        className="searchbox__form"
        action=""
        role="search"
        autoComplete="off"
        onSubmit={(event) => {
          event.preventDefault()
          setQueryState(query)
          useStoreQueryToLocalStorage(query)
          if (query === '') setTooltip(true)
          if (query !== '') {
            navigate({
              pathname: '/search',
              search: `?${searchParams}`,
            })
          }
        }}
      >
        <input
          className="searchbox__form__input"
          // ref={setSearchBoxRef}
          type="search"
          value={queryState ? queryState : ''}
          placeholder={t('placeHolder')}
          onClick={() => {
            if (pathname === '/') setIsFederatedOpen(true)
            setSbIsActive(true)
          }}
          onChange={(event) => {
            refineFunction(event.currentTarget.value)
            refine(event.currentTarget.value)
            setTooltip(false)
          }}
        />
        {!!tooltip && (
          <div className="searchbox__tooltip">
            <p>{t('tooltip')}</p>
          </div>
        )}
        {!!hasKeystroke && (
          <div className="searchbox__btn">
            <div
              className="closeBtn"
              onClick={() => {
                setQueryState('')
                searchParams.set('query', '')
                setSearchParams(searchParams)
              }}
            >
              <SimpleCloseButton />
            </div>
            <div
              className="submitBtn"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={() => {
                setQueryState(query)
                useStoreQueryToLocalStorage(query)
                if (query !== '') {
                  navigate({
                    pathname: '/search',
                    search: `?${searchParams}`,
                  })
                }
              }}
            >
              <p
                className={
                  isHovered
                    ? 'submitBtn__text submitBtn__text-active'
                    : 'submitBtn__text submitBtn__text-inactive'
                }
              >
                {t('submit')}
              </p>
              <div
                className={
                  isHovered
                    ? 'submitBtn__picto submitBtn__picto-inactive'
                    : 'submitBtn__picto submitBtn__picto-active'
                }
              >
                <SubmitPicto />
              </div>
            </div>
          </div>
        )}
        {navigationState && isSearchInCategory && (
          <SearchInCategory state={state} />
        )}
        <Glass />
      </form>
    </div>
  )
}

export default memo(CustomSearchBox)
