// Render the navigation menu in the header

// React Router
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
// Recoil Header State
import { useRecoilState, useRecoilValue } from 'recoil'

import WithToolTip from '@/components/algoliaExplain/tooltip/WithTooltip'

// Import Config for the header
import {
  categoryPageFilterAttribute,
  linksHeader,
  navigationStateAtom,
} from '@/config/navigationConfig'

//Import config from helped navigation
import { windowSize } from '@/hooks/useScreenSize'

import ConditionalWrapper from '@/utils/ConditionalWrapper'

const Navigation = ({ isMenuOpen, setIsMenuOpen }) => {
  const { isDesktop } = useRecoilValue(windowSize)

  // navigate is used by React Router
  const navigate = useNavigate()
  const { state } = useLocation()

  const highlightingCat = () => {
    if (state?.action !== null) {
      if (state?.type === 'filter') {
        return state.action
          .split(':')[1]
          .split('>')
          .pop()
          .replace("'", '')
          .slice(0, -1)
          .toLowerCase()
      } else if (state?.type === 'context') {
        return state?.action.toLowerCase()
      } else {
        null
      }
    } else {
    }
  }

  // Import the navigation links, as defined in the config
  const links = useRecoilValue(linksHeader)

  let [searchParams, setSearchParams] = useSearchParams()

  const [navigationState, setNavigationState] =
    useRecoilState(navigationStateAtom)

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
          <ConditionalWrapper
            condition={link.type === 'context'}
            wrapper={(children) => (
              <WithToolTip translationKey="contextLink">{children}</WithToolTip>
            )}
          >
            <li
              id={link.name}
              tabIndex="0"
              key={link.name}
              onClick={() => {
                //Build action based on link type, then navigate
                let action = null
                if (link.type === 'filter' && link.filter?.length > 0) {
                  action = `${categoryPageFilterAttribute}:'${link.filter}'`
                } else if (link.type === 'context') {
                  action = link.context
                } else if (
                  link.type === 'rawFilter' &&
                  link.rawFilter?.length > 0
                ) {
                  action = `${link.rawFilter}`
                }

                setNavigationState({
                  type: link.type,
                  name: link.name,
                  action: action,
                  segment: link.segment,
                })
                searchParams.set('category', link.name)
                navigate({
                  pathname: '/search',
                  search: `?${searchParams}`,
                })

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
        )
      })}
    </ul>
  )
}

export default Navigation
