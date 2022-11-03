// Component for the searchbox being used when a category is selected eg. 'Mens'xz

import { useNavigate } from 'react-router-dom'
import { CloseButton } from '@/assets/svg/SvgIndex'

//Use Translation
import { useTranslation } from 'react-i18next'

import { navigationStateAtom } from '@/config/navigationConfig'
import { useRecoilState } from 'recoil'

const SearchInCategory = () => {
  const [navigationState, setNavigationState] =
    useRecoilState(navigationStateAtom)

  // navigate is used by React Router

  const navigate = useNavigate()
  // Import and use translation
  const { t } = useTranslation('translation', {
    keyPrefix: 'srp',
  })

  if (navigationState?.type === 'filter' && navigationState?.action !== null) {
    return (
      <div className="searchbox__category">
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
  } else if (navigationState?.type === 'context') {
    return (
      <div className="searchbox__category">
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
