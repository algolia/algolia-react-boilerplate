// This SearchBox is with a magnifying glass inside
// but simple it means with only a glass simple effect

import { memo, useEffect, useState, useMemo } from 'react'

import debounce from 'lodash.debounce'

// Import navigate function to route to results page on search submit
import { useLocation, useNavigate } from 'react-router-dom'

// Import Recoil
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

// Import SVG from file as a component
import { Glass, SimpleCloseButton, SubmitPicto } from '@/assets/svg/SvgIndex'
import SearchInCategory from './components/SearchInCategory'

import {
  isSearchInCategory,
  searchBoxIsActive,
  localSearchQueryAtom,
} from '@/config/searchboxConfig'

import { navigationStateAtom } from '@/config/navigationConfig'

import { shouldHaveOpenFederatedSearch } from '@/config/federatedConfig'

//Use Translation
import { useTranslation } from 'react-i18next'

// Custom Hooks
import useStoreQueryToLocalStorage from '@/hooks/useStoreStringToLocalStorage'

//Import scope SCSS
import './SCSS/searchbox.scss'

import { useSearchBox } from 'react-instantsearch-hooks-web'

import { useSearchParams } from 'react-router-dom'

function CustomSearchBox() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { query, refine } = useSearchBox()

  const [navigationState, setNavigationState] =
    useRecoilState(navigationStateAtom)

  const [hasKeystroke, setHasKeystroke] = useState(false)

  const [sbIsActive, setSbIsActive] = useRecoilState(searchBoxIsActive)

  const [tooltip, setTooltip] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const setIsFederatedOpen = useSetRecoilState(shouldHaveOpenFederatedSearch)

  // router hook to navigate using a function
  const navigate = useNavigate()
  // Get states of React Router
  const { state, pathname } = useLocation()

  // Import and use translation
  const { t } = useTranslation('translation', {
    keyPrefix: 'searchBox',
  })

  const [localQuery, setLocalQuery] = useRecoilState(localSearchQueryAtom)

  useEffect(() => {
    query === '' ? setHasKeystroke(false) : setHasKeystroke(true)
  }, [query])

  const searchOnChangeHandler = (event) => {
    setLocalQuery(event.target.value)
    debouncedSearchInputHandler(event.target.value)
    setTooltip(false)
  }

  const handleContextInUrl = (event) => {
    if (navigationState.type === 'context' && event.target.value === '') {
      searchParams.delete(navigationState.type)
      searchParams.append(navigationState.type, navigationState.value)
      setSearchParams(searchParams)
    }
    if (navigationState.type === 'context' && event.target.value !== '') {
      setNavigationState({})
    }
  }

  const debouncedSearchInputHandler = useMemo(
    () => debounce((value) => refine(value), 300),
    []
  )

  // on page refresh, local query is null but URL might have one, so read from URL just in case
  useEffect(() => {
    if (localQuery === '' && query !== null) {
      setLocalQuery(query)
    }
  }, [])

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
          // used for recent searches
          useStoreQueryToLocalStorage(query)
          if (query === '') setTooltip(true)
          if (query !== '') {
            navigate({
              pathname: '/search',
            })
          }
        }}
      >
        <input
          value={localQuery}
          className="searchbox__form__input"
          type="search"
          placeholder={t('placeHolder')}
          onClick={() => {
            if (pathname === '/') setIsFederatedOpen(true)
            setSbIsActive(true)
          }}
          onChange={(event) => {
            searchOnChangeHandler(event)
            setTimeout(() => handleContextInUrl(event), 1000)
          }}
        />
        {!!tooltip && (
          <div className="searchbox__tooltip">
            <p>{t('tooltip')}</p>
          </div>
        )}
        {!!hasKeystroke && (
          <div
            className={
              pathname !== '/search'
                ? 'searchbox__btn'
                : 'searchbox__btn searchbox__btn-srp'
            }
          >
            <div
              className="closeBtn"
              onClick={() => {
                if (query !== '') refine('')
              }}
            >
              <SimpleCloseButton />
            </div>
            {pathname !== '/search' && (
              <div
                className="submitBtn"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => {
                  // used for recent searches
                  useStoreQueryToLocalStorage(query)
                  if (query !== '') {
                    navigate({
                      pathname: '/search',
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
            )}
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
