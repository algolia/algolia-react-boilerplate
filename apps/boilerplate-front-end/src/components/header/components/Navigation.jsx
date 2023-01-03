// Render the navigation menu in the header
import React, { useEffect } from 'react'

// React Router
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
// Recoil Header State
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import WithToolTip from '@/components/algoliaExplain/tooltip/WithTooltip'

// Import Config for the header
import {
  categoryPageFilterAttribute,
  isHierarchicalFilterAttribute,
  linksHeader,
  navigationStateAtom,
} from '@/config/navigationConfig'

//Import config from helped navigation
import { windowSize } from '@/hooks/useScreenSize'

import {
  useHierarchicalMenu,
  useRefinementList,
  useSearchBox,
} from 'react-instantsearch-hooks-web'
import { localSearchQueryAtom } from '@/config/searchboxConfig'
import ConditionalWrapper from '@/utils/ConditionalWrapper'

const Navigation = ({ isMenuOpen, setIsMenuOpen }) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { refine: refineQuery } = useSearchBox()
  const setLocalQuery = useSetRecoilState(localSearchQueryAtom)
  let refine = null

  if (isHierarchicalFilterAttribute) {
    const { refine: hierarchicalRefine } = useHierarchicalMenu({
      attributes: [categoryPageFilterAttribute],
    })
    refine = hierarchicalRefine
  } else {
    const { refine: normalRefine } = useRefinementList({
      attribute: categoryPageFilterAttribute,
    })
    refine = normalRefine
  }

  const { isDesktop } = useRecoilValue(windowSize)

  // navigate is used by React Router
  const navigate = useNavigate()
  const { state } = useLocation()

  const highlightingCat = () => {
    if (state?.value !== null) {
      if (state?.type === 'filter') {
        return state.value
          .split(':')[1]
          .split('>')
          .pop()
          .replace("'", '')
          .slice(0, -1)
          .toLowerCase()
      } else if (state?.type === 'context') {
        return state?.value.toLowerCase()
      } else {
        null
      }
    } else {
    }
  }

  // Import the navigation links, as defined in the config
  const links = useRecoilValue(linksHeader)

  const [navigationState, setNavigationState] =
    useRecoilState(navigationStateAtom)

  const handleLinkClick = (link) => {
    //1 - refine by the value, category, filter or context
    if (link.type !== 'context') {
      searchParams.delete('context')
      refine(link.value)
    }
    // set internal state for the application
    setNavigationState({
      type: link.type,
      name: link.name,
      value: link.value,
    })

    //2 - check if there are any other search params and delete them if there are in double
    for (const key of searchParams.keys()) {
      if (key === link.type) {
        searchParams.delete(key)
      }
    }

    //3 - set the new search params
    if (link.type === 'context') {
      // Refine the refinements
      refine('')
      // Refine the query
      refineQuery('')
      // Change Query Value in SearchBox component
      setLocalQuery('')
      // Set the context in URL
      searchParams.append(link.type, link.value)
      setSearchParams(searchParams)
    }
    //4 - navigate to the search page
    // define the navigation params
    const navigationParams = {
      pathname: '/search',
      search: `?${searchParams}`,
    }
    // navigate to the search page
    navigate(navigationParams)
  }

  useEffect(() => {
    // remove the nav state if a query in a context page
    if (
      navigationState.type === 'context' &&
      searchParams.get('query') !== null &&
      searchParams.get('query') !== ''
    ) {
      setNavigationState({})
      searchParams.delete('category')
      setSearchParams(searchParams)
    }
  }, [navigationState, searchParams])

  return (
    <ul
      className={`${
        isMenuOpen
          ? 'container-mobile__navList-items'
          : 'container__header-nav__links'
      } `}
    >
      {links.map((link, i) => {
        return (
          <React.Fragment key={i}>
            <ConditionalWrapper
              condition={link.type === 'context'}
              wrapper={(children) => (
                <WithToolTip translationKey="contextLink">
                  {children}
                </WithToolTip>
              )}
            >
              <li
                id={link.name}
                tabIndex="0"
                key={link.name}
                onClick={() => {
                  handleLinkClick(link)

                  // Only used for Mobile view
                  if (!isDesktop) {
                    setIsMenuOpen(false)
                  }
                }}
              >
                <p
                  className={
                    highlightingCat() === link.name.toLowerCase() ||
                    navigationState?.name === link.name
                      ? 'selected'
                      : ''
                  }
                >
                  {link.name}
                </p>
              </li>
            </ConditionalWrapper>
          </React.Fragment>
        )
      })}
    </ul>
  )
}

export default Navigation
