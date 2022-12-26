import { memo } from 'react'

// components import
import { ChevronRight } from '@/assets/svg/SvgIndex'

import { useNavigate } from 'react-router-dom'

const RecentSearches = ({ title, query, refine }) => {
  const getSearches = localStorage.getItem('recentSearches')
  const cleanSearches = JSON.parse(getSearches)
  // router hook to navigate using a function
  const navigate = useNavigate()

  if (cleanSearches && cleanSearches.length !== 0) {
    return (
      <div className="recentSearches">
        <h3 className="recentSearches__title">{title}</h3>
        <ul className="recentSearches__items">
          {cleanSearches
            .reverse()
            .splice(0, 3)
            .map((search, index) => {
              return (
                <li
                  onClick={() => {
                    refine(search)
                    navigate({
                      pathname: '/search',
                      replace: false,
                    })
                  }}
                  key={index}
                >
                  <ChevronRight />
                  <p>{search}</p>
                </li>
              )
            })}
        </ul>
      </div>
    )
  } else {
    return null
  }
}

export default memo(RecentSearches)
