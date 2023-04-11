import { memo, useMemo } from 'react'

// debounce import
import { debounce } from 'lodash'

// components import
import { ChevronRight } from '@/assets/svg/SvgIndex'

import { useNavigate } from 'react-router-dom'

const RecentSearches = ({ title, query, refine }) => {
  const getSearches = localStorage.getItem('recentSearches')
  const cleanSearches = JSON.parse(getSearches)
  // router hook to navigate using a function
  const navigate = useNavigate()

  const handleClick = (query) => {
    refine(query)
    debouncedSearchInputHandler()
  }

  const debouncedSearchInputHandler = useMemo(() =>
    debounce(() => {
      navigate({
        pathname: '/search',
      })
    }, 500)
  )

  if (cleanSearches && cleanSearches.length !== 0) {
    return (
      <section className="recentSearches">
        <h3 className="recentSearches__title">{title}</h3>
        <ul className="recentSearches__items">
          {cleanSearches
            .reverse()
            .splice(0, 3)
            .map((search, index) => {
              return (
                <li
                  onClick={() => {
                    handleClick(search)
                  }}
                  key={index}
                >
                  <ChevronRight />
                  <p>{search}</p>
                </li>
              )
            })}
        </ul>
      </section>
    )
  } else {
    return null
  }
}

export default memo(RecentSearches)
