import { memo } from 'react'

// Algolia's imports
import { Highlight, useHits } from 'react-instantsearch-hooks-web'

// components import
import { ChevronRight } from '@/assets/svg/SvgIndex'

// Router import
import { useNavigate } from 'react-router-dom'

function QuerySuggestions({ refine, title }) {
  //Get title
  const { hits } = useHits()
  // router hook to navigate using a function
  const navigate = useNavigate()
  return (
    <div className="suggestions">
      <h3 className="suggestions__title">{title}</h3>
      <ul className="suggestions__items">
        {hits.map((hit, index) => {
          return (
            <li
              key={index}
              className="suggestions__item"
              onClick={() => {
                refine(hit.query)
                navigate({
                  pathname: '/search',
                })
              }}
            >
              <ChevronRight />
              <p>
                <Highlight hit={hit} attribute="query" />
              </p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default memo(QuerySuggestions)
