// Component for the searchbox being used when a category is selected eg. 'Mens'xz
import { useNavigate } from 'react-router-dom'
import { CloseButton } from '@/assets/svg/SvgIndex'

//Use Translation
import { useTranslation } from 'react-i18next'

import {
  categoryPageFilterAttribute,
  isHierarchicalFilterAttribute,
  navigationStateAtom,
} from '@/config/navigationConfig'
import { useRecoilState } from 'recoil'
import {
  useHierarchicalMenu,
  useRefinementList,
} from 'react-instantsearch-hooks-web'

// React router
import { useSearchParams } from 'react-router-dom'

const SearchInCategory = () => {
  let [searchParams, setSearchParams] = useSearchParams()

  const [navigationState, setNavigationState] =
    useRecoilState(navigationStateAtom)

  // navigate is used by React Router

  const navigate = useNavigate()

  // Import and use translation
  const { t } = useTranslation('translation', {
    keyPrefix: 'srp',
  })

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

  if (
    navigationState?.type === 'category' ||
    navigationState?.type === 'filter'
  ) {
    return (
      <div className="searchbox__category">
        <p>
          {t('searchInCategory')} {navigationState.name}
        </p>
        <span
          onClick={() => {
            setNavigationState({})
            refine('')
            navigate('/search')
          }}
          className="searchbox__category__close-btn"
        >
          <CloseButton />
        </span>
      </div>
    )
  } else if (
    // if context link currently clicked and a query not present
    navigationState?.type === 'context' &&
    (searchParams.get('query') === null || searchParams.get('query') === '')
  ) {
    return (
      <div className="searchbox__category">
        <p>{t('searchInContext')}</p>
        <span
          onClick={() => {
            refine('')
            setNavigationState({})
            navigate('/search')
          }}
          className="searchbox__category__close-btn"
        >
          <CloseButton />
        </span>
      </div>
    )
  } else if (navigationState?.type === 'rawFilter') {
    return (
      <div className="searchbox__category searchbox__category-raw">
        <p>
          {t('searchInCategory')} {navigationState.name}
        </p>
        <span
          onClick={() => {
            setNavigationState({})
            navigate('/search')
          }}
          className="searchbox__category__close-btn"
        >
          <CloseButton />
        </span>
      </div>
    )
  } else {
    return null
  }
}

export default SearchInCategory
