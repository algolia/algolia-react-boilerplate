import { memo, useMemo } from 'react'

// debounce import
import { debounce } from 'lodash'

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

  return (
    <section className="suggestions">
      <h3 className="suggestions__title">{title}</h3>
      <ul className="suggestions__items">
        {hits.map((hit, index) => {
          return (
            <li
              key={index}
              className="suggestions__item"
              onClick={() => {
                handleClick(hit.query)
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
    </section>
  )
}

export default memo(QuerySuggestions)
